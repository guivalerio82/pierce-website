import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

export const EarlyAccessForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set window size on mount and update on resize
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStatus('success');
      setMessage("Thanks for signing up! We'll be in touch soon.");
      setShowConfetti(true);
      setEmail('');
      
      // Stop confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <>
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
          />
        )}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">🎉 Welcome Aboard!</h3>
          <p className="text-green-600">{message}</p>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting...' : 'Get Early Access'}
        </button>
      </div>
      {message && status === 'error' && (
        <p className="text-sm text-red-600">{message}</p>
      )}
    </form>
  );
}; 