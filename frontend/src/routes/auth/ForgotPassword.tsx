import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = () => {
    // Hier kannst du die Logik zum Zurücksetzen des Passworts implementieren
    // Beispiel: API-Aufruf zum Senden einer E-Mail zum Zurücksetzen des Passworts

    // Hier setzen wir die Variable "emailSent" auf true, um anzuzeigen, dass die E-Mail gesendet wurde
    setEmailSent(true);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="mx-auto w-full max-w-md">
        <a href="/accounts">
          <div className="flex items-center justify-start">
            <img
              className="mx-auto h-12 w-auto"
              src="../src/assets/logo.svg"
              alt="Logo"
            />
          </div>
        </a>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Forgot Password
        </h2>
        <div className="mt-8 px-4 py-8 sm:rounded-lg sm:px-10">
          {emailSent ? (
            <div>
              <p className="text-lg text-white">
                An email with instructions to reset your password has been sent
                to your email address.
              </p>
              <p className="mt-2 text-sm text-gray-300">
                Please check your email and follow the instructions to reset
                your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
