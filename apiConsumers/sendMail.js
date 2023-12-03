// apiConsumer.js

export async function sendEmail({ to, subject, text }) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(`Failed to send email: ${message}`);
      }
  
      const { success, message } = await response.json();
      return { success, message };
    } catch (error) {
      console.error('API Consumer Error:', error.message);
      throw error;
    }
  }
  
  export default sendEmail;
  