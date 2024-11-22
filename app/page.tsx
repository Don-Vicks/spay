"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {joinNewsletter} from "@/actions/subsribe-newsletter";

export default function SubscribePage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await joinNewsletter(email);
            setSubmitted(true);
        } catch (err) {
            setError("Failed to subscribe. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                background: `linear-gradient(to bottom, #7A75B5, #4B4B4D)`
            }}
            className="min-h-screen flex items-center justify-center"
        >
            <div className="w-full max-w-md px-4 py-8 sm:px-0">
                <Card className="backdrop-blur-lg bg-white/95 dark:bg-slate-950/95 shadow-lg">
                    {!submitted ? (
                        <>
                            <CardHeader className="space-y-6 text-center">
                                <div
                                    style={{ backgroundColor: 'rgba(122, 117, 181, 0.2)' }}
                                    className="mx-auto rounded-full p-3 w-16 h-16 flex items-center justify-center"
                                >
                                    <Mail
                                        style={{ color: '#7A75B5' }}
                                        className="h-8 w-8"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h1
                                        style={{ color: '#7A75B5' }}
                                        className="text-3xl font-bold tracking-tight"
                                    >
                                        Join Our Newsletter
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Get exclusive updates, insights, and perks delivered directly to your inbox.
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setError(null);
                                                }}
                                                style={{
                                                    '--tw-ring-color': '#7A75B5',
                                                    borderColor: error ? 'rgb(239, 68, 68)' : '#7A75B5'
                                                } as React.CSSProperties}
                                                className="h-12 pr-12 focus:ring-2"
                                                disabled={loading}
                                            />
                                            <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                                                  style={{ color: '#7A75B5' }}
                                            />
                                        </div>
                                        {error && (
                                            <Alert variant="destructive" className="py-2">
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#7A75B5',
                                            color: 'white'
                                        }}
                                        className="w-full h-12 hover:opacity-90 transition-opacity"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        By subscribing, you agree to our{" "}
                                        <a
                                            href="#"
                                            style={{ color: '#7A75B5' }}
                                            className="underline hover:opacity-80"
                                        >
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            style={{ color: '#7A75B5' }}
                                            className="underline hover:opacity-80"
                                        >
                                            Privacy Policy
                                        </a>
                                        {' '} and agree to receive product updates from us.
                                    </p>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="text-center py-12">
                            <div className="mb-6 flex justify-center">
                                <div
                                    style={{ backgroundColor: 'rgba(122, 117, 181, 0.2)' }}
                                    className="rounded-full p-4"
                                >
                                    <CheckCircle2
                                        style={{ color: '#7A75B5' }}
                                        className="h-8 w-8"
                                    />
                                </div>
                            </div>
                            <h2
                                style={{ color: '#7A75B5' }}
                                className="text-2xl font-bold mb-3"
                            >
                                You're All Set! 🎉
                            </h2>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Thank you for subscribing!.
                            </p>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    );
}