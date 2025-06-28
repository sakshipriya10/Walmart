// Frontend/src/api/spin.js

export const spinWheelAPI = async (userId) => {
  try {
    const response = await fetch('http://localhost:5000/api/spin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
