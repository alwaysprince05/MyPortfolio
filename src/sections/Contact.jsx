import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { profile } from "../constants";

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Check for success parameter from FormSubmit redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      showAlertMessage("success", "Message sent! I'll get it in my Gmail.");
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isFormspreeConfigured = () => {
    const id = profile.formspreeFormId;
    return id && typeof id === "string" && id.trim() !== "";
  };

  const isEmailJSConfigured = () => {
    const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = profile;
    return (
      emailjsServiceId &&
      emailjsTemplateId &&
      emailjsPublicKey &&
      emailjsServiceId !== "your_service_id" &&
      emailjsTemplateId !== "your_template_id" &&
      emailjsPublicKey !== "your_public_key"
    );
  };

  const isFormSubmitConfigured = () => {
    return profile.formsubmitHash && profile.formsubmitHash.trim() !== "";
  };

  const handleFormSubmitClick = (e) => {
    // For FormSubmit, submit form programmatically to bypass React
    if (isFormSubmitConfigured() && !isFormspreeConfigured() && !isEmailJSConfigured()) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.submit();
      }
      return;
    }
  };

  const handleSubmit = async (e) => {
    // For AJAX submissions, prevent default
    e.preventDefault();
    setIsLoading(true);

    if (isFormspreeConfigured()) {
      try {
        const res = await fetch(`https://formspree.io/f/${profile.formspreeFormId.trim()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _replyto: formData.email,
          }),
        });
        setIsLoading(false);
        if (res.ok) {
          setFormData({ name: "", email: "", message: "" });
          showAlertMessage("success", "Message sent! I'll get it in my Gmail.");
        } else {
          const data = await res.json().catch(() => ({}));
          showAlertMessage(
            "danger",
            data.error || "Something went wrong. Try emailing me at " + profile.email
          );
        }
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        showAlertMessage(
          "danger",
          "Network error. Try emailing me at " + profile.email
        );
      }
      return;
    }

    if (isEmailJSConfigured()) {
      try {
        await emailjs.send(
          profile.emailjsServiceId,
          profile.emailjsTemplateId,
          {
            from_name: formData.name,
            to_name: profile.name,
            from_email: formData.email,
            to_email: profile.email,
            message: formData.message,
          },
          profile.emailjsPublicKey
        );
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Your message has been sent!");
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        showAlertMessage(
          "danger",
          "Something went wrong. Please try again."
        );
      }
      return;
    }

    // Fallback to FormSubmit with email (if no hash configured)
    try {
      const formsubmitEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`;
      
      const res = await fetch(formsubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Contact from ${formData.name}`,
          _captcha: false,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setIsLoading(false);
      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Message sent! I'll get it in my Gmail.");
      } else {
        showAlertMessage(
          "danger",
          "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      showAlertMessage("danger", "Something went wrong. Please try again.");
    }
  };
  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center w-full max-w-lg sm:max-w-xl p-5 sm:p-6 mx-auto border border-white/10 rounded-xl bg-primary shadow-lg">
        <form 
          ref={formRef}
          className="w-full space-y-5" 
          onSubmit={handleSubmit}
          action={isFormSubmitConfigured() && !isFormspreeConfigured() && !isEmailJSConfigured() 
            ? `https://formsubmit.co/${profile.formsubmitHash}` 
            : undefined}
          method={isFormSubmitConfigured() && !isFormspreeConfigured() && !isEmailJSConfigured() 
            ? "POST" 
            : undefined}
        >
          {isFormSubmitConfigured() && !isFormspreeConfigured() && !isEmailJSConfigured() && (
            <>
              <input type="hidden" name="_next" value={`${window.location.origin}${window.location.pathname}?success=true`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Contact Form Submission" />
            </>
          )}
          <div>
            <label htmlFor="name" className="field-label block text-neutral-300 font-medium mb-1.5 text-sm">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus w-full rounded-lg px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/30 transition"
              placeholder="Your name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="field-label block text-neutral-300 font-medium mb-1.5 text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus w-full rounded-lg px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/30 transition"
              placeholder="your@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="field-label block text-neutral-300 font-medium mb-1.5 text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus w-full rounded-lg px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/30 transition resize-none"
              placeholder="Your message..."
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleFormSubmitClick}
            className="w-full py-3 px-4 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-lavender to-royal hover:opacity-90 transition shadow-md"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
