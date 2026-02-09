# Receive contact form messages in your Gmail

Right now the "Send" button only **opens** the visitor's email app with a pre-filled message. It does **not** send the email for them. So you only get the message in your Gmail when they press "Send" in their app.

To have messages **sent automatically to your Gmail** (so they land in your inbox, including on your phone), set up **EmailJS** (free):

## Steps

### 1. Create an EmailJS account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up (free)

### 2. Add an Email Service
- In the dashboard: **Email Services** → **Add New Service**
- Choose **Gmail** (or any provider you use)
- Connect your Gmail (princemaurya1201@gmail.com) and follow the prompts
- Copy the **Service ID** (e.g. `service_xxxxxxx`)

### 3. Create an Email Template
- Go to **Email Templates** → **Create New Template**
- Set **To Email** to: `princemaurya1201@gmail.com`
- Set **Subject** to something like: `Contact from {{from_name}}`
- In **Content**, use the variables:
  - `{{from_name}}` – sender's name  
  - `{{from_email}}` – sender's email  
  - `{{message}}` – message text  
  Example:
  ```
  New message from {{from_name}} ({{from_email}}):

  {{message}}
  ```
- Save and copy the **Template ID** (e.g. `template_xxxxxxx`)

### 4. Get your Public Key
- Go to **Account** → **API Keys** (or **General**)
- Copy your **Public Key**

### 5. Put the IDs in your project
- Open `src/constants/index.js`
- Replace the placeholders in `profile`:
  - `emailjsServiceId: "your_service_id"` → your **Service ID**
  - `emailjsTemplateId: "your_template_id"` → your **Template ID**
  - `emailjsPublicKey: "your_public_key"` → your **Public Key**

Example:
```js
emailjsServiceId: "service_abc123",
emailjsTemplateId: "template_xyz789",
emailjsPublicKey: "abc123xyz789",
```

Save the file and restart the dev server. After that, when someone clicks "Send" on your contact form, the message will be sent to your Gmail and you’ll see it on your phone and computer.
