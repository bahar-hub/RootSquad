# Root Squad

Django-ready version of the Root Squad frontend.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\\Scripts\\activate      # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open: http://127.0.0.1:8000/

## Routes

- `/` home
- `/about/`
- `/projects/`
- `/services/`
- `/contact/`
- `/estimate/`
- `/admin/`

## Frontend structure

- `core/templates/core/base.html` base template
- `core/templates/core/includes/` shared header/footer
- `core/templates/core/*.html` page templates
- `core/static/core/css/` modular styles
- `core/static/core/js/` modular JavaScript

The contact form is frontend-only for now. The Django backend handling can be added next.
