import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import pkg from '7zip-bin';
const { path7za } = pkg;

function buildAndZip() {
  try {
    console.log('Starting file processing...');

    // Ensure output directory exists
    const outputDir = './output';
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Read files from dist directory
    const distDir = './dist';
    const htmlContent = readFileSync(join(distDir, 'index.html'), 'utf-8');
    const cssContent = readFileSync(join(distDir, 'style.css'), 'utf-8');
    const jsContent = readFileSync(join(distDir, 'index.js'), 'utf-8');

    // Create merged HTML content with minification
    const minifyHtml = (html) => html.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
    const minifyCss = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    const minifyJs = (js) => js.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();

    const mergedHtml = minifyHtml(htmlContent
      .replace('<link rel=stylesheet crossorigin href=./style.css>', `<style>${minifyCss(cssContent)}</style>`)
      .replace('<script type=module crossorigin src=./index.js></script>', `<script type=module>${minifyJs(jsContent)}</script>`));

    // Write merged HTML file
    const outputHtmlPath = join(outputDir, 'index.html');
    writeFileSync(outputHtmlPath, mergedHtml);
    console.log('Merged HTML file created:', outputHtmlPath);
    console.log('Merged file size:', (mergedHtml.length / 1024).toFixed(2), 'KB');

    // Create ZIP compressed file using 7zip
    console.log('Starting ZIP file creation with 7zip...');
    const zipPath = join(outputDir, 'source.zip');
    
    // Use 7zip to create the zip file with optimized compression (only file, no directory)
    execSync(`cd "${outputDir}" && "${path7za}" a -tzip -mx=9 "source.zip" "index.html"`, {
      stdio: 'inherit'
    });
    
    // Get file size
    const stats = statSync(zipPath);
    console.log('ZIP file created:', zipPath);
    console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');

    console.log('All operations completed!');

  } catch (error) {
    console.error('Error during processing:', error.message);
    process.exit(1);
  }
}

buildAndZip();