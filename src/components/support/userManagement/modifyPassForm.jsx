"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, EyeOff, Eye, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PasswordModificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, newPassword, confirmPassword } = formData;

    // Validate username
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    // Validate password
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      )
    ) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, number and special character";
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 25;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;

    return Math.min(100, strength);
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.newPassword));
  }, [formData.newPassword]);

  const searchUser = async () => {
    if (!formData.username) {
      setErrors({ ...errors, username: "Username is required" });
      return;
    }

    setErrors({ ...errors, username: null });
    setSearchLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUserFound(true);
    setSearchLoading(false);

    toast.error("User Found", {
      description: `You can now set a new password for ${formData.username}.`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password Changed Successfully", {
        description: `The password for ${formData.username} has been updated.`,
      });

      // Reset form
      setFormData({
        username: "",
        newPassword: "",
        confirmPassword: "",
      });
      setUserFound(false);
      setPasswordStrength(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    {
      id: "length",
      label: "8+ characters",
      met: formData.newPassword.length >= 8,
    },
    {
      id: "uppercase",
      label: "Uppercase letter",
      met: /[A-Z]/.test(formData.newPassword),
    },
    {
      id: "lowercase",
      label: "Lowercase letter",
      met: /[a-z]/.test(formData.newPassword),
    },
    { id: "number", label: "Number", met: /[0-9]/.test(formData.newPassword) },
    {
      id: "special",
      label: "Special character",
      met: /[^A-Za-z0-9]/.test(formData.newPassword),
    },
  ];

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Change User Password</CardTitle>
        <CardDescription>
          Enter a username to find the user, then set their new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* <div className="flex flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <div>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.username}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                onClick={searchUser}
                disabled={searchLoading || !formData.username}
              >
                {searchLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Find User
              </Button>
            </div> */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.username}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={searchUser}
                disabled={searchLoading || !formData.username}
              >
                {searchLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Find User
              </Button>
            </div>

            {userFound && (
              <div className="space-y-4 mt-4 pt-4 border-t">
                <Badge variant="outline" className="mb-2">
                  User: {formData.username}
                </Badge>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                      aria-invalid={errors.newPassword ? "true" : "false"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.newPassword}
                    </p>
                  )}

                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm text-slate-500">
                        Password Strength
                      </p>
                      <span
                        className={
                          passwordStrength < 30
                            ? "text-red-500"
                            : passwordStrength < 60
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                      >
                        {passwordStrength < 30
                          ? "Weak"
                          : passwordStrength < 60
                          ? "Medium"
                          : "Strong"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={
                          passwordStrength < 30
                            ? "bg-red-500"
                            : passwordStrength < 60
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                        style={{
                          width: `${passwordStrength}%`,
                          height: "100%",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {passwordRequirements.map((req) => (
                      <div key={req.id} className="flex items-center text-sm">
                        {req.met ? (
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 mr-1 text-gray-400" />
                        )}
                        <span
                          className={
                            req.met ? "text-green-500" : "text-gray-500"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Change Password
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
