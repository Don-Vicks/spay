import Form from "next/form";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {login} from "@/actions/login";

export default function SignupForm() {
    return (
        <Card className="w-full max-w-md mx-auto justify-center items-center">
            <CardHeader>
                <CardTitle className="text-2xl">Login to your Sign In</CardTitle>
                <CardDescription>Enter your details to Sign In</CardDescription>
            </CardHeader>

            {/* Using Form for Server Actions */}
            <Form action={login}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    );
}
