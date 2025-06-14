// Custom Vite plugin to replace the default Vite heart icon with our favicon
export default function customHeaderPlugin() {
  return {
    name: 'vite-plugin-custom-header',
    transformIndexHtml(html: string): string {
      // Replace the default Vite heart icon with our favicon.png
      return html.replace(
        /<link rel="icon" type="image\/svg\+xml" href="\/vite\.svg" \/>/,
        '<link rel="icon" type="image/png" href="/favicon.png" />'
      );
    }
  };
}
