const pdfParse = require("pdf-parse");
const fs = require("fs");

// Test the actual PDF file
const pdfPath = "uploads/resumes/1795077564206-Dnyandeo_Shekad.pdf";

console.log("Testing PDF:", pdfPath);
console.log("File exists:", fs.existsSync(pdfPath));

if (fs.existsSync(pdfPath)) {
  const dataBuffer = fs.readFileSync(pdfPath);
  console.log("Buffer size:", dataBuffer.length, "bytes");
  console.log("MIME type should be: application/pdf");
  
  pdfParse(dataBuffer).then((res) => {
    console.log("=== PDF PARSE RESULTS ===");
    console.log("Pages:", res.numpages);
    console.log("Text length:", res.text.length);
    console.log("Text preview (first 500 chars):");
    console.log(res.text.substring(0, 500));
    console.log("---");
    if (res.text.trim().length < 20) {
      console.log("WARNING: Extracted text is too short (< 20 chars)");
    }
  }).catch((err) => {
    console.error("=== PDF PARSE ERROR ===");
    console.error("Error message:", err.message);
  });
} else {
  console.error("PDF file not found!");
}