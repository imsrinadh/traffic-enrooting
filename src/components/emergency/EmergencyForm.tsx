import React, { useState } from 'react';
import { MapPin, Flag, Calendar, Clock, Truck, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import type { EmergencyAnalysisRequest, VehicleType } from '../../types/api';

interface FormState {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  vehicleType: VehicleType | '';
}

interface FormErrors {
  origin?: string;
  destination?: string;
  departureDate?: string;
  departureTime?: string;
  vehicleType?: string;
}

interface EmergencyFormProps {
  onSubmit: (request: EmergencyAnalysisRequest) => void;
  loading?: boolean;
}

const VEHICLE_OPTIONS: Array<{ value: VehicleType; label: string }> = [
  { value: 'Ambulance',     label: 'Ambulance' },
  { value: 'FireEngine',    label: 'Fire & Rescue' },
  { value: 'RescueVehicle', label: 'Emergency Response' },
];

const INITIAL_STATE: FormState = {
  origin: '',
  destination: '',
  departureDate: '',
  departureTime: '',
  vehicleType: '',
};

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.origin.trim())      errors.origin = 'Origin location is required.';
  if (!form.destination.trim()) errors.destination = 'Destination location is required.';
  if (!form.departureDate)      errors.departureDate = 'Departure date is required.';
  if (!form.departureTime)      errors.departureTime = 'Departure time is required.';
  if (!form.vehicleType)        errors.vehicleType = 'Please select an emergency vehicle category.';
  return errors;
};

const todayISO = (): string => new Date().toISOString().split('T')[0];

export const EmergencyForm: React.FC<EmergencyFormProps> = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormState>>(new Set());

  const set = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => new Set([...prev, field]));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = new Set<keyof FormState>(['origin', 'destination', 'departureDate', 'departureTime', 'vehicleType']);
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      departureDate: form.departureDate,
      departureTime: form.departureTime,
      vehicleType: form.vehicleType as VehicleType,
    });
  };

  const handleClear = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setTouched(new Set());
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Trip Details Form">
      <div className="card p-5 bg-white border-[#E5E7EB]">
        <div className="border-b border-[#F0F2F5] pb-3 mb-4">
          <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
            Trip Details
          </h2>
          <p className="text-2xs text-[#6B7280] mt-0.5">
            Enter incident coordinates to evaluate candidate corridors.
          </p>
        </div>

        <div className="space-y-4">
          {/* Origin */}
          <div>
            <label htmlFor="origin" className="field-label">
              Origin <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
                <MapPin size={14} />
              </span>
              <input
                id="origin"
                type="text"
                value={form.origin}
                onChange={(e) => set('origin')(e.target.value)}
                onBlur={() => handleBlur('origin')}
                placeholder="Enter starting location"
                aria-required="true"
                aria-invalid={!!errors.origin}
                className={`input-base pl-9 ${errors.origin ? 'error' : ''}`}
              />
            </div>
            <p className="text-2xs text-[#9CA3AF] mt-1">
              Where the emergency vehicle will depart from.
            </p>
            {errors.origin && (
              <div role="alert" className="flex items-center gap-1 mt-1 text-2xs text-red-600">
                <AlertCircle size={11} className="flex-shrink-0" />
                <span>{errors.origin}</span>
              </div>
            )}
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="destination" className="field-label">
              Destination <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
                <Flag size={14} />
              </span>
              <input
                id="destination"
                type="text"
                value={form.destination}
                onChange={(e) => set('destination')(e.target.value)}
                onBlur={() => handleBlur('destination')}
                placeholder="Enter destination"
                aria-required="true"
                aria-invalid={!!errors.destination}
                className={`input-base pl-9 ${errors.destination ? 'error' : ''}`}
              />
            </div>
            <p className="text-2xs text-[#9CA3AF] mt-1">
              Where the vehicle needs to arrive.
            </p>
            {errors.destination && (
              <div role="alert" className="flex items-center gap-1 mt-1 text-2xs text-red-600">
                <AlertCircle size={11} className="flex-shrink-0" />
                <span>{errors.destination}</span>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="departureDate" className="field-label">
                Departure Date <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
                  <Calendar size={14} />
                </span>
                <input
                  id="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={(e) => set('departureDate')(e.target.value)}
                  onBlur={() => handleBlur('departureDate')}
                  min={todayISO()}
                  aria-required="true"
                  className={`input-base pl-9 ${errors.departureDate ? 'error' : ''}`}
                />
              </div>
              <p className="text-2xs text-[#9CA3AF] mt-1">
                When the journey begins.
              </p>
              {errors.departureDate && (
                <div role="alert" className="flex items-center gap-1 mt-1 text-2xs text-red-600">
                  <AlertCircle size={11} className="flex-shrink-0" />
                  <span>{errors.departureDate}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="departureTime" className="field-label">
                Departure Time <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
                  <Clock size={14} />
                </span>
                <input
                  id="departureTime"
                  type="time"
                  value={form.departureTime}
                  onChange={(e) => set('departureTime')(e.target.value)}
                  onBlur={() => handleBlur('departureTime')}
                  aria-required="true"
                  className={`input-base pl-9 ${errors.departureTime ? 'error' : ''}`}
                />
              </div>
              {errors.departureTime && (
                <div role="alert" className="flex items-center gap-1 mt-1 text-2xs text-red-600">
                  <AlertCircle size={11} className="flex-shrink-0" />
                  <span>{errors.departureTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Vehicle Type */}
          <div>
            <label htmlFor="vehicleType" className="field-label">
              Emergency Vehicle <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
                <Truck size={14} />
              </span>
              <select
                id="vehicleType"
                value={form.vehicleType}
                onChange={(e) => set('vehicleType')(e.target.value)}
                onBlur={() => handleBlur('vehicleType')}
                aria-required="true"
                className={`select-base pl-9 ${errors.vehicleType ? 'error' : ''}`}
              >
                <option value="">Select vehicle category...</option>
                {VEHICLE_OPTIONS.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
              </select>
            </div>
            <p className="text-2xs text-[#9CA3AF] mt-1">
              Used to account for emergency response requirements.
            </p>
            {errors.vehicleType && (
              <div role="alert" className="flex items-center gap-1 mt-1 text-2xs text-red-600">
                <AlertCircle size={11} className="flex-shrink-0" />
                <span>{errors.vehicleType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-[#F0F2F5]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            Find Best Route →
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmergencyForm;
