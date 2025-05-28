if (-not (Test-Path ".venv")) {
    .\install_script.ps1
}

.venv\Scripts\Activate.ps1

python main.py