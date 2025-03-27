// Check if the browser supports Service Workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((error) => console.error('Service Worker Registration Failed:', error));
  }
  
  // Example: Add dynamic content to the page
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'container';
    container.style.margin = '20px auto';
    container.style.width = '90%';
    container.style.maxWidth = '500px';
    container.style.textAlign = 'center';
  
    // Title
    const title = document.createElement('h1');
    title.textContent = 'Hungeon games pwa';
    title.style.color = '#333';
  
    // Description
    const description = document.createElement('p');
    description.textContent =
      'This is hungeon game pwa';
    description.style.fontSize = '16px';
    description.style.lineHeight = '1.6';
  
    // Create a text input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter your name...';
    input.style.width = '80%';
    input.style.padding = '10px';
    input.style.margin = '10px 0';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    input.style.fontSize = '16px';
  
    // Create a button
    const button = document.createElement('button');
    button.textContent = 'Greet Me';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
  
    // Message container
    const message = document.createElement('p');
    message.id = 'greeting';
    message.style.marginTop = '20px';
    message.style.fontSize = '18px';
    message.style.color = '#007bff';
  
    // Append elements to the container
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(message);
  
    // Add the container to the body
    document.body.appendChild(container);
  });
  
  let installPromptEvent;
  
  // Listen for the `beforeinstallprompt` event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Save the event so it can be triggered later
    installPromptEvent = e;
  
    // Optionally, show an install button
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.style.padding = '10px 20px';
    installButton.style.fontSize = '16px';
    installButton.style.cursor = 'pointer';
    installButton.style.marginTop = '20px';
  
    // Append the button to the body or a container
    const container = document.getElementById('container') || document.body;
    container.appendChild(installButton);
  
    // Add a click event to trigger the installation
    installButton.addEventListener('click', () => {
      installPromptEvent.prompt(); // Show the install prompt
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        installPromptEvent = null; // Clear the saved event
        installButton.remove(); // Optionally, remove the install button
      });
    });
  });