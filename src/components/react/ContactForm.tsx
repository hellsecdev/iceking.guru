import { useState, type FormEvent } from 'react';
import { contactSection } from '../../content/sections';
import { site, whatsappUrl } from '../../content/site';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `מייל: ${email}`,
      `הודעה: ${message}`,
    ].join('\n');
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  };

  const fields = [
    { id: 'name', label: contactSection.fields.name, value: name, set: setName, type: 'text' },
    { id: 'phone', label: contactSection.fields.phone, value: phone, set: setPhone, type: 'tel' },
    { id: 'email', label: contactSection.fields.email, value: email, set: setEmail, type: 'email' },
  ] as const;

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl space-y-4 lg:max-w-2xl">
      {fields.map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="mb-1 block text-end text-lg font-semibold text-ice-400">
            {f.label} <span className="text-red-500">*</span>
          </label>
          <input
            id={f.id}
            type={f.type}
            required
            value={f.value}
            onChange={(e) => f.set(e.target.value)}
            className="input-field"
            dir="rtl"
          />
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-1 block text-end text-lg font-semibold text-ice-400">
          {contactSection.fields.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-field resize-y"
          dir="rtl"
        />
      </div>
      <button type="submit" className="btn-pill w-full py-3 text-lg">
        🚀 {contactSection.submit}
      </button>
      <p className="text-center text-[0.65rem] leading-snug text-ice-300/90">
        הטופס יפתח שיחה ב-WhatsApp ({site.phone})
      </p>
    </form>
  );
}
