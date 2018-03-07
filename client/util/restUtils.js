export default function handleRESTResponse({
  response,
  successCallback,
  errorCallback,
  errorText = 'Something went wrong.',
  errorLabel = 'Application error.',
}) {
  return () => {
    if (!response.status || response.ok) {
      successCallback();
    } else if (errorCallback) {
      errorCallback();
    } else {
      const errorMessage = `${errorText}, ${errorLabel}`;

      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(errorMessage);
    }
  };
}
