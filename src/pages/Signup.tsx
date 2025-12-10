import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown } from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const roles: UserRole[] = ['FieldTeam', 'Responder', 'Manager', 'Executive'];
const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
const otpOptions = ['Yes', 'No'];

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    location: '',
    phone: '',
    gender: '',
    otpEnabled: '',
  });
  
  const [dropdowns, setDropdowns] = useState({
    role: false,
    gender: false,
    otp: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      role: false,
      gender: false,
      otp: false,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    
    if (!formData.role) {
      toast({ title: 'Please select a role', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || null,
        gender: formData.gender || null,
        location: formData.location || null,
        otpEnabled: formData.otpEnabled === 'Yes',
      });
      toast({ title: 'Account created successfully!' });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Signup failed', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const SelectDropdown = ({ 
    label, 
    value, 
    options, 
    placeholder, 
    dropdownKey,
    onChange 
  }: { 
    label: string;
    value: string;
    options: string[];
    placeholder: string;
    dropdownKey: keyof typeof dropdowns;
    onChange: (value: string) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown(dropdownKey)}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value || placeholder}
          </span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {dropdowns[dropdownKey] && (
          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  toggleDropdown(dropdownKey);
                }}
                className="w-full px-4 py-3 text-left hover:bg-muted text-foreground transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl shadow-2xl p-8">
        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Register for security operations access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                placeholder="johndoe"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="operator@security.com"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Role */}
            <SelectDropdown
              label="Role"
              value={formData.role}
              options={roles}
              placeholder="Select role"
              dropdownKey="role"
              onChange={(value) => updateField('role', value)}
            />

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City, Country"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
            </div>

            {/* Gender */}
            <SelectDropdown
              label="Gender"
              value={formData.gender}
              options={genders}
              placeholder="Select gender"
              dropdownKey="gender"
              onChange={(value) => updateField('gender', value)}
            />
          </div>

          {/* OTP - Full Width */}
          <SelectDropdown
            label="Enable OTP Verification?"
            value={formData.otpEnabled}
            options={otpOptions}
            placeholder="Select option"
            dropdownKey="otp"
            onChange={(value) => updateField('otpEnabled', value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center mt-6 text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
