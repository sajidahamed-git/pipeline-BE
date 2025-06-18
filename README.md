# Backend API Setup

## Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

## Setup Instructions
1. Create a virtual environment:
in CMD run : python -m venv venv

2. Install the required dependencies:
in powershell run: pip install -r dependencies.txt

## Running the Application

1. Make sure your virtual environment is activated (you should see `(venv)` in your terminal)
    in CMD run : venv\Scripts\activate

2. Start the FastAPI server:
powershell: uvicorn main:app --reload

3. Both the frontend and backend should run at the sametime in different terminals, look in the readme of the frontend folder for more details about frontend


The API will be available at `http://localhost:8000`


