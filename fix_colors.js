const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Replace dark blues with text-dark or dark-bg
css = css.replace(/#1b2463/gi, 'var(--color-text-dark)');
css = css.replace(/#15255c/gi, 'var(--color-text-dark)');
css = css.replace(/#162364/gi, 'var(--color-text-dark)');
css = css.replace(/#132e78/gi, 'var(--color-text-dark)');
css = css.replace(/#232a67/gi, 'var(--color-dark-bg)');
css = css.replace(/#56627f/gi, 'var(--color-text-mid)');
css = css.replace(/#8a93ad/gi, 'var(--color-text-light)');
css = css.replace(/#e6ebfb/gi, 'var(--color-border)');

// Replace blue with primary
css = css.replace(/#18a8e0/gi, 'var(--color-primary)');
css = css.replace(/#00a7e1/gi, 'var(--color-primary)');
css = css.replace(/rgba\(24, 168, 224/g, 'rgba(255, 107, 53'); // primary orange rgb
css = css.replace(/rgba\(255, 213, 79/g, 'rgba(255, 209, 102'); // secondary yellow rgb

// Button primary gradient
css = css.replace(/linear-gradient\(135deg, #ff6b35 0%, #ff914d 100%\)/gi, 'linear-gradient(135deg, #FF6B35 0%, #FF4F81 100%)');

// Replace success gradient to use success color
css = css.replace(/linear-gradient\(135deg, #2bb348, var\(--color-primary\)\)/gi, 'var(--color-success)');

// Add animation to success-check
if (!css.includes('@keyframes checkIn')) {
    css += `\n\n.success-check { animation: checkIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }\n@keyframes checkIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }\n`;
}

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log('Fixed colors in globals.css');
