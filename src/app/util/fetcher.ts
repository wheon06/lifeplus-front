export default async function fetcher(
  url: string,
  method: string = 'GET',
  data?: any,
) {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    window.location.href = '/signin';
    return;
  }

  let response = await fetch('http://localhost:4000' + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: method !== 'GET' ? JSON.stringify(data) : undefined,
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      'http://localhost:4000/refreshAccessToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      localStorage.setItem('accessToken', refreshData.accessToken);

      response = await fetch('http://lifeplus-back:4000' + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
      });
    } else {
      window.location.href = '/signin';
      return;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
