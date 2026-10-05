"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Button, { type ButtonProps } from "../Button";

export type FormValue = string | boolean;
export type FormValues = Record<string, FormValue>;

interface BaseField {
    name: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
    /** Render at half width on tablet and up (pairs with an adjacent half field). */
    half?: boolean;
    /** Return an error message, or undefined when valid. Runs after the built-in checks. */
    validate?: (value: FormValue, values: FormValues) => string | undefined;
}

export interface TextField extends BaseField {
    type?: "text" | "email" | "password" | "tel" | "url" | "number";
    placeholder?: string;
    autoComplete?: string;
    defaultValue?: string;
}

export interface TextareaField extends BaseField {
    type: "textarea";
    placeholder?: string;
    maxLength?: number;
    defaultValue?: string;
}

export interface SelectField extends BaseField {
    type: "select";
    options: { label: string; value: string }[];
    placeholder?: string;
    defaultValue?: string;
}

export interface CheckboxField extends BaseField {
    type: "checkbox";
    defaultValue?: boolean;
}

export type FormField = TextField | TextareaField | SelectField | CheckboxField;

export interface FormAction
    extends Pick<ButtonProps, "variant" | "size" | "disabled" | "onClick"> {
    label: string;
    /** "submit" runs validation and onSubmit; "reset" restores initial values. */
    type?: "submit" | "button" | "reset";
    /** Force the loading state. Submit actions show it automatically while onSubmit is pending. */
    loading?: boolean;
}

export interface FormProps {
    fields: FormField[];
    actions: FormAction[];
    onSubmit: (values: FormValues) => void | Promise<void>;
    /** Errors from outside the form (e.g. the server), keyed by field name. */
    errors?: Record<string, string>;
    /** Message shown above the actions, e.g. a failed submission. */
    formError?: string;
    actionsAlign?: "start" | "end" | "stretch";
    className?: string;
}

const labelClass = "text-small font-medium leading-5 text-ink";

const fieldClass =
    "w-full rounded-input border bg-surface px-[14px] text-body leading-[26px] text-ink placeholder:text-subtle transition-[border-color,box-shadow] duration-(--duration-hover) focus:outline-none focus:border-brand focus:shadow-[0_0_0_4px_rgb(82_103_255/0.28)] disabled:cursor-not-allowed disabled:bg-surface-alt disabled:border-border disabled:placeholder:text-subtle";

const alignClasses = {
    start: "justify-start",
    end: "justify-end",
    stretch: "[&>*]:flex-1",
};

function initialValues(fields: FormField[]): FormValues {
    return Object.fromEntries(
        fields.map((f) => [
            f.name,
            f.defaultValue ?? (f.type === "checkbox" ? false : ""),
        ]),
    );
}

function checkField(field: FormField, values: FormValues): string | undefined {
    const value = values[field.name];
    const empty = field.type === "checkbox" ? value !== true : value === "";
    if (field.required && empty) {
        return field.type === "checkbox"
            ? `Please check “${field.label}”.`
            : `${field.label} is required.`;
    }
    if (field.type === "email" && value && !/^\S+@\S+\.\S+$/.test(String(value))) {
        return "Enter a valid email address, like name@company.com.";
    }
    return field.validate?.(value, values);
}

function ErrorMessage({ id, children }: { id: string; children: string }) {
    return (
        <p id={id} className="flex items-center gap-[6px] text-small text-danger">
            <Image src="/imgs/form_alert_circle.svg" alt="" width={16} height={16} />
            {children}
        </p>
    );
}

export default function Form({
    fields,
    actions,
    onSubmit,
    errors: externalErrors,
    formError,
    actionsAlign = "start",
    className = "",
}: FormProps) {
    const formId = useId();
    const [values, setValues] = useState<FormValues>(() => initialValues(fields));
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    // Fields added after mount (conditional fields) fall back to their defaults.
    const valueOf = (f: FormField): FormValue =>
        values[f.name] ?? (f.type === "checkbox" ? false : (f.defaultValue ?? ""));
    const errorOf = (f: FormField) => errors[f.name] ?? externalErrors?.[f.name];

    function setValue(field: FormField, value: FormValue) {
        const next = { ...values, [field.name]: value };
        setValues(next);
        // Once a field shows an error, re-check as the user types so it clears right away.
        if (errors[field.name]) {
            setErrors((prev) => ({ ...prev, [field.name]: checkField(field, next) ?? "" }));
        }
    }

    function blur(field: FormField, e: React.FocusEvent) {
        // Moving focus to a button (e.g. Submit) must not shift the layout under the pointer,
        // or the click is lost. Submit validates everything anyway.
        if (e.relatedTarget instanceof HTMLButtonElement) return;
        if (valueOf(field) === "" && !field.required) return;
        setErrors((prev) => ({ ...prev, [field.name]: checkField(field, values) ?? "" }));
    }

    function reset() {
        setValues(initialValues(fields));
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const current = Object.fromEntries(fields.map((f) => [f.name, valueOf(f)]));
        const found: Record<string, string> = {};
        for (const f of fields) {
            const message = checkField(f, current);
            if (message) found[f.name] = message;
        }
        setErrors(found);
        if (Object.keys(found).length) {
            const first = fields.find((f) => found[f.name]);
            document.getElementById(`${formId}-${first?.name}`)?.focus();
            return;
        }
        setSubmitting(true);
        try {
            await onSubmit(current);
        } finally {
            setSubmitting(false);
        }
    }

    function renderField(field: FormField) {
        const id = `${formId}-${field.name}`;
        const error = errorOf(field) || undefined;
        const errorId = `${id}-error`;
        const helpId = `${id}-help`;
        const describedBy =
            [error && errorId, field.helperText && helpId].filter(Boolean).join(" ") || undefined;
        const value = valueOf(field);
        const borderClass = error
            ? "border-danger"
            : "border-border-strong enabled:hover:border-subtle";
        const common = {
            id,
            name: field.name,
            disabled: field.disabled,
            required: field.required,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy,
            onBlur: (e: React.FocusEvent) => blur(field, e),
        };

        if (field.type === "checkbox") {
            return (
                <div className="flex flex-col gap-[6px]">
                    <label
                        htmlFor={id}
                        className={`flex min-h-[44px] items-center gap-[10px] text-small ${field.disabled ? "text-subtle" : "text-ink"}`}
                    >
                        <span className="relative size-[20px] shrink-0">
                            <input
                                {...common}
                                type="checkbox"
                                checked={value === true}
                                onChange={(e) => setValue(field, e.target.checked)}
                                className={`peer size-full cursor-pointer appearance-none rounded-[6px] border-[1.5px] bg-surface transition-colors duration-(--duration-hover) checked:border-brand checked:bg-brand focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgb(82_103_255/0.28)] disabled:cursor-not-allowed disabled:bg-surface-alt disabled:checked:border-border-strong disabled:checked:bg-border-strong ${error ? "border-danger" : "border-border-strong"}`}
                            />
                            <Image
                                src="/imgs/form_check.svg"
                                alt=""
                                width={14}
                                height={14}
                                className="pointer-events-none absolute inset-[3px] hidden peer-checked:block"
                            />
                        </span>
                        {field.label}
                    </label>
                    {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-[6px]">
                <label htmlFor={id} className={`${labelClass} ${field.disabled ? "text-muted" : ""}`}>
                    {field.label}
                </label>
                {field.type === "textarea" ? (
                    <textarea
                        {...common}
                        value={String(value)}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        onChange={(e) => setValue(field, e.target.value)}
                        className={`${fieldClass} ${borderClass} h-[128px] resize-y py-[12px]`}
                    />
                ) : field.type === "select" ? (
                    <div className="relative">
                        <select
                            {...common}
                            value={String(value)}
                            onChange={(e) => setValue(field, e.target.value)}
                            className={`${fieldClass} ${borderClass} h-[48px] cursor-pointer appearance-none pr-5 ${value === "" ? "text-subtle" : ""}`}
                        >
                            <option value="" disabled={field.required}>
                                {field.placeholder ?? "Select an option"}
                            </option>
                            {field.options.map((o) => (
                                <option key={o.value} value={o.value} className="text-ink">
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <Image
                            src="/imgs/form_chevron_down.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2"
                        />
                    </div>
                ) : (
                    <input
                        {...common}
                        type={field.type ?? "text"}
                        value={String(value)}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        onChange={(e) => setValue(field, e.target.value)}
                        className={`${fieldClass} ${borderClass} h-[48px]`}
                    />
                )}
                {field.helperText && !error && (
                    <p id={helpId} className="text-small text-muted">
                        {field.helperText}
                    </p>
                )}
                {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
            </div>
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit} onReset={(e) => { e.preventDefault(); reset(); }} className={`flex flex-col gap-3 ${className}`}>
            <div className="grid grid-cols-1 gap-x-2 gap-y-3 tablet:grid-cols-2">
                {fields.map((field) => (
                    <div key={field.name} className={field.half ? "" : "tablet:col-span-2"}>
                        {renderField(field)}
                    </div>
                ))}
            </div>
            {formError && (
                <div role="alert">
                    <ErrorMessage id={`${formId}-form-error`}>{formError}</ErrorMessage>
                </div>
            )}
            <div className={`flex flex-col gap-2 tablet:flex-row ${alignClasses[actionsAlign]}`}>
                {actions.map(({ label, type = "button", variant, loading, ...rest }) => (
                    <Button
                        key={label}
                        type={type}
                        variant={variant ?? (type === "submit" ? "primary" : "secondary")}
                        loading={loading ?? (type === "submit" && submitting)}
                        {...rest}
                    >
                        {label}
                    </Button>
                ))}
            </div>
        </form>
    );
}
