import os
import io
import base64
import fitz
import google.generativeai as genai
from next.server import NextResponse
from next.server import Request

# Configure the Gemini API with your API key from Vercel's environment variables
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def gemini_response(pdf_content, prompt):
    """
    Sends the PDF content and user prompt to the Gemini model
    and returns the response text.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([pdf_content[0], prompt])
        return response.text
    except Exception as e:
        # It's good practice to log the error for debugging on Vercel
        print(f"An error occurred with the Gemini API: {str(e)}")
        raise e

def pdf_conversion(uploaded_file):
    """
    Converts the first page of an uploaded PDF file to a JPEG image.
    This is the Vercel-compatible approach.
    """
    if uploaded_file is None:
        raise FileNotFoundError("No file was uploaded.")
    
    try:
        pdf_data = uploaded_file.read()
        doc = fitz.open("pdf", pdf_data)
        
        # Get the first page
        first_page = doc.load_page(0)
        
        # Render the page to an image (pixmap)
        pix = first_page.get_pixmap()
        
        # Convert the pixmap to a bytes array in JPEG format
        img_byte_arr = pix.tobytes(output="jpeg")
        
        # Encode the image data to base64 for API transmission
        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        
        return pdf_parts
    except Exception as e:
        raise Exception(f"Failed to convert PDF: {str(e)}")

# This function handles all POST requests to /api/chat
async def POST(request):
    """
    This endpoint handles the chatbot logic for medical reports.
    """
    try:
        # Use request.formData() to handle multipart/form-data
        formData = await request.formData()
        
        uploaded_file = formData.get('file')
        user_prompt = formData.get('prompt')

        if not uploaded_file:
            return NextResponse.json({'error': 'No file part in the request'}, status=400)
        
        if not user_prompt:
            return NextResponse.json({'error': 'No prompt provided'}, status=400)

        # The Vercel request file object is already a file-like object
        pdf_content = pdf_conversion(uploaded_file)
        
        # Send the PDF image and the user's prompt directly to the model
        response_text = gemini_response(pdf_content, user_prompt)
        
        return NextResponse.json({'response': response_text})
    
    except Exception as e:
        return NextResponse.json({'error': str(e)}, status=500)
