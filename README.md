# Root Squad — Django + SCSS

فرانت Root Squad به ساختار Django Template + SCSS ماژولار تبدیل شده است.

## ساختار مهم

```text
core/
├── templates/core/
│   ├── base.html
│   ├── includes/
│   └── *.html
└── static/core/
    ├── scss/
    │   ├── abstracts/
    │   ├── base/
    │   ├── layout/
    │   ├── components/
    │   ├── pages/
    │   └── main.scss
    ├── css/
    │   └── main.css        # خروجی کامپایل‌شده SCSS
    └── js/
```

## نصب Python

```bash
python -m venv .venv
```

Windows:

```bash
.venv\\Scripts\\activate
```

macOS / Linux:

```bash
source .venv/bin/activate
```

سپس:

```bash
pip install -r requirements.txt
python manage.py migrate
```

## نصب SCSS compiler

Node.js باید نصب باشد. سپس یک‌بار:

```bash
npm install
```

برای توسعه و کامپایل خودکار SCSS:

```bash
npm run sass:watch
```

برای build نهایی:

```bash
npm run sass:build
```

Django فقط فایل خروجی زیر را سرو می‌کند:

```text
core/static/core/css/main.css
```

فایل‌های داخل `scss/` منبع اصلی استایل هستند و تغییر مستقیم `main.css` توصیه نمی‌شود.

## اجرای Django

در یک ترمینال:

```bash
python manage.py runserver
```

و هنگام توسعه SCSS در ترمینال دوم:

```bash
npm run sass:watch
```

سایت:

```text
http://127.0.0.1:8000/
```

## مسیرها

- `/`
- `/about/`
- `/projects/`
- `/services/`
- `/contact/`
- `/estimate/`
- `/admin/`

## Production

قبل از deploy:

```bash
npm ci
npm run sass:build
python manage.py collectstatic --noinput
```

SCSS در زمان request توسط Django کامپایل نمی‌شود؛ خروجی CSS از قبل build می‌شود که برای production سبک‌تر و قابل‌اعتمادتر است.
