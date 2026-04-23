"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BadgeCheck, MapPinned, ShieldCheck, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { useStore } from "@/components/providers/store-provider";
import { bangladeshAddressData, bangladeshDivisions } from "@/data/bangladesh-address";
import {
  getCurrentStoredUser,
  isStoredUserLoggedIn,
  saveOrderForCurrentUser,
} from "@/lib/auth";

type DeliveryAreaType = "union" | "city";
type PaymentMethod = "ssl-bkash" | "ssl-nagad" | "ssl-rocket" | "ssl-card" | "cod";

interface CheckoutFormState {
  fullName: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  deliveryPoint: string;
  cityAddress: string;
  couponCode: string;
  orderNote: string;
  paymentMethod: PaymentMethod;
}

type CheckoutErrors = Partial<Record<keyof CheckoutFormState, string>>;

const couponRules: Record<string, { discountType: "percent" | "flat"; amount: number; label: string }> = {
  DISCOUNT10: { discountType: "percent", amount: 10, label: "10% off" },
  SAVE50: { discountType: "flat", amount: 50, label: "Flat 50 off" },
};

const paymentOptions = [
  {
    value: "ssl-bkash" as const,
    title: "bKash via SSLCommerz",
    subtitle: "Pay instantly with your bKash wallet.",
  },
  {
    value: "ssl-nagad" as const,
    title: "Nagad via SSLCommerz",
    subtitle: "Use Nagad securely through the payment gateway.",
  },
  {
    value: "ssl-rocket" as const,
    title: "Rocket via SSLCommerz",
    subtitle: "Complete payment with DBBL Rocket.",
  },
  {
    value: "ssl-card" as const,
    title: "Card / SSLCommerz",
    subtitle: "Visa, Mastercard, Amex and more.",
  },
  {
    value: "cod" as const,
    title: "Cash on Delivery",
    subtitle: "Pay in cash after delivery confirmation.",
  },
];

const inputClassName = (hasError: boolean) => clsx("form-input checkout-field", hasError && "error");

export function CheckoutPageClient() {
  const { cartItems, removeManyFromCart } = useStore();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [checkoutItems, setCheckoutItems] = useState(cartItems);

  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    division: "",
    district: "",
    upazila: "",
    union: "",
    deliveryPoint: "",
    cityAddress: "",
    couponCode: "",
    orderNote: "",
    paymentMethod: "ssl-bkash",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [couponStatus, setCouponStatus] = useState("");

  const divisionOptions = [...bangladeshDivisions].sort((a, b) => a.localeCompare(b));
  const districtOptions = useMemo(
    () => {
      const districts = bangladeshAddressData.find((division) => division.name === formData.division)?.districts ?? [];
      return [...districts].sort((a, b) => a.name.localeCompare(b.name));
    },
    [formData.division],
  );
  const selectedDistrict = districtOptions.find((district) => district.name === formData.district);
  const upazilaOptions = [...(selectedDistrict?.upazilas ?? [])].sort((a, b) => a.name.localeCompare(b.name));
  const selectedUpazila = upazilaOptions.find((upazila) => upazila.name === formData.upazila);
  const unionOptions = [...(selectedUpazila?.unions ?? [])].sort((a, b) => a.localeCompare(b));
  const areaType: DeliveryAreaType = selectedUpazila?.city ? "city" : "union";

  useEffect(() => {
    setCheckoutItems(cartItems);
  }, [cartItems]);

  const checkoutSubtotal = useMemo(
    () => checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [checkoutItems],
  );

  const couponDetails = couponRules[formData.couponCode.trim().toUpperCase()];
  const discount = couponDetails
    ? couponDetails.discountType === "percent"
      ? Math.round((checkoutSubtotal * couponDetails.amount) / 100)
      : couponDetails.amount
    : 0;
  const shipping =
    checkoutSubtotal > 0 ? (formData.division === "Dhaka" && formData.district === "Dhaka" ? 60 : 120) : 0;
  const total = Math.max(checkoutSubtotal + shipping - discount, 0);

  useEffect(() => {
    const currentUser = getCurrentStoredUser();
    const loggedIn = isStoredUserLoggedIn();

    setIsLoggedIn(loggedIn);
    setCustomerName(currentUser?.name ?? "");

    if (!currentUser) {
      return;
    }

    setFormData((current) => ({
      ...current,
      fullName: current.fullName || currentUser.name || "",
      email: current.email || currentUser.email || "",
      phone: current.phone || currentUser.mobile || "",
    }));
  }, []);

  const setField = <K extends keyof CheckoutFormState>(field: K, value: CheckoutFormState[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleDivisionChange = (value: string) => {
    setFormData((current) => ({
      ...current,
      division: value,
      district: "",
      upazila: "",
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
    setErrors((current) => ({
      ...current,
      division: "",
      district: "",
      upazila: "",
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
  };

  const handleDistrictChange = (value: string) => {
    setFormData((current) => ({
      ...current,
      district: value,
      upazila: "",
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
    setErrors((current) => ({
      ...current,
      district: "",
      upazila: "",
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
  };

  const handleUpazilaChange = (value: string) => {
    setFormData((current) => ({
      ...current,
      upazila: value,
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
    setErrors((current) => ({
      ...current,
      upazila: "",
      union: "",
      deliveryPoint: "",
      cityAddress: "",
    }));
  };

  const applyCoupon = () => {
    if (!formData.couponCode.trim()) {
      setCouponStatus("Coupon code is optional. Leave it blank if you do not have one.");
      return;
    }

    if (couponDetails) {
      setCouponStatus(`Coupon applied: ${couponDetails.label}`);
      setErrors((current) => ({ ...current, couponCode: "" }));
      return;
    }

    setCouponStatus("");
    setErrors((current) => ({ ...current, couponCode: "Coupon code is not valid." }));
  };

  const focusFirstInvalidField = (nextErrors: CheckoutErrors) => {
    const fieldPriority: (keyof CheckoutFormState)[] = [
      "fullName",
      "phone",
      "secondaryPhone",
      "email",
      "division",
      "district",
      "upazila",
      ...(areaType === "union" ? (["union", "deliveryPoint"] as const) : (["cityAddress"] as const)),
      "paymentMethod",
      "couponCode",
    ];

    const firstInvalidField = fieldPriority.find((field) => nextErrors[field]);

    if (!firstInvalidField || !formRef.current) {
      return;
    }

    const target = formRef.current.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`);

    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.focus();
    });
  };

  const validate = () => {
    const nextErrors: CheckoutErrors = {};

    if (!checkoutItems.length) {
      nextErrors.fullName = "Add at least one product before checkout.";
    }

    if (!formData.fullName.trim()) nextErrors.fullName = "Enter your full name.";
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Enter a valid Bangladesh mobile number.";
    }
    if (formData.secondaryPhone.trim() && !/^(\+?88)?01[3-9]\d{8}$/.test(formData.secondaryPhone.trim())) {
      nextErrors.secondaryPhone = "Enter a valid alternate mobile number.";
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.division) nextErrors.division = "Select a division.";
    if (!formData.district) nextErrors.district = "Select a district.";
    if (!formData.upazila) nextErrors.upazila = "Select an upazila or thana.";
    if (areaType === "union" && !formData.union) nextErrors.union = "Select a union.";
    if (areaType === "union" && !formData.deliveryPoint.trim()) {
      nextErrors.deliveryPoint = "Enter the post office or preferred delivery point.";
    }
    if (areaType === "city" && !formData.cityAddress.trim()) {
      nextErrors.cityAddress = "Enter your detailed city address.";
    }
    if (!formData.paymentMethod) nextErrors.paymentMethod = "Choose a payment method.";
    if (formData.couponCode.trim() && !couponDetails) nextErrors.couponCode = "Coupon code is not valid.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField(nextErrors);
    }
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const fullAddress =
      areaType === "city"
        ? `${formData.upazila}, ${formData.district}, ${formData.division}. ${formData.cityAddress}`
        : `${formData.union}, ${formData.upazila}, ${formData.district}, ${formData.division}. ${formData.deliveryPoint}`;

    const order = {
      id: `AT-${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB"),
      orderedAt: new Date().toISOString(),
      email: formData.email,
      phone: formData.phone,
      customerName: formData.fullName,
      division: formData.division,
      district: formData.district,
      paymentMethod:
        paymentOptions.find((option) => option.value === formData.paymentMethod)?.title ?? formData.paymentMethod,
      address: fullAddress,
      subtotal: checkoutSubtotal,
      shipping,
      discount,
      total,
      items: checkoutItems,
      note: formData.orderNote,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    saveOrderForCurrentUser(order);
    removeManyFromCart(checkoutItems.map((item) => item.id));
    router.push("/order-success/");
  };

  if (!checkoutItems.length) {
    return (
      <div className="empty-card checkout-empty">
        <ShieldCheck size={42} />
        <h2>Your checkout is empty</h2>
        <p>Add something to your cart first, then come back to finish the order.</p>
        <Button href="/shop/">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="checkout-layout checkout-layout--premium">
      <form className="detail-card checkout-form checkout-form--premium" onSubmit={handleSubmit} ref={formRef}>
        <div className="checkout-form__section">
          <div className="checkout-form__section-head">
            <div>
              <p className="checkout-kicker">Customer Details</p>
              <h2>Delivery Information</h2>
              <p className="checkout-login-prompt">
                {isLoggedIn ? (
                  <>
                    Returning customer? <Link href="/profile/">{customerName}</Link>
                  </>
                ) : (
                  <>
                    Returning customer? <Link href="/login/?redirect=/checkout/">Click here to login</Link>
                  </>
                )}
              </p>
            </div>
            <div className="checkout-badge">
              <ShieldCheck size={16} />
              Bangladesh Delivery Checkout
            </div>
          </div>

          <div className="form-grid form-grid--checkout">
            <label className="form-group">
              <span className="form-label">Full Name</span>
              <input
                className={inputClassName(Boolean(errors.fullName))}
                name="fullName"
                placeholder="Your Name"
                type="text"
                value={formData.fullName}
                onChange={(event) => setField("fullName", event.target.value)}
              />
              {errors.fullName ? <span className="error-message">{errors.fullName}</span> : null}
            </label>

            <label className="form-group">
              <span className="form-label">Mobile Number</span>
              <input
                className={inputClassName(Boolean(errors.phone))}
                name="phone"
                placeholder="01XXXXXXXXX"
                type="tel"
                value={formData.phone}
                onChange={(event) => setField("phone", event.target.value)}
              />
              {errors.phone ? <span className="error-message">{errors.phone}</span> : null}
            </label>

            <label className="form-group">
              <span className="form-label">Alternate Mobile Number (Optional)</span>
              <input
                className={inputClassName(Boolean(errors.secondaryPhone))}
                name="secondaryPhone"
                placeholder="Optional"
                type="tel"
                value={formData.secondaryPhone}
                onChange={(event) => setField("secondaryPhone", event.target.value)}
              />
              {errors.secondaryPhone ? <span className="error-message">{errors.secondaryPhone}</span> : null}
            </label>

            <label className="form-group">
              <span className="form-label">Email (Optional)</span>
              <input
                className={inputClassName(Boolean(errors.email))}
                name="email"
                placeholder="name@email.com"
                type="email"
                value={formData.email}
                onChange={(event) => setField("email", event.target.value)}
              />
              {errors.email ? <span className="error-message">{errors.email}</span> : null}
            </label>
          </div>
        </div>

        <div className="checkout-form__section">
          <div className="checkout-form__section-head">
            <div>
              <p className="checkout-kicker">Accurate Address</p>
              <h3>Bangladesh Address Selection</h3>
            </div>
            <div className="checkout-icon-chip">
              <MapPinned size={16} />
              Required for delivery
            </div>
          </div>

          <div className="form-grid form-grid--checkout">
            <label className="form-group">
              <span className="form-label">Division</span>
              <select
                className={clsx("form-input checkout-field", errors.division && "error")}
                name="division"
                value={formData.division}
                onChange={(event) => handleDivisionChange(event.target.value)}
              >
                <option value="">Select Division</option>
                {divisionOptions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division ? <span className="error-message">{errors.division}</span> : null}
            </label>

            <label className="form-group">
              <span className="form-label">District</span>
              <select
                className={clsx("form-input checkout-field", errors.district && "error")}
                name="district"
                value={formData.district}
                onChange={(event) => handleDistrictChange(event.target.value)}
              >
                <option value="">Select District</option>
                {districtOptions.map((district) => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district ? <span className="error-message">{errors.district}</span> : null}
            </label>

            <label className="form-group">
              <span className="form-label">Upazila / Thana</span>
              <select
                className={clsx("form-input checkout-field", errors.upazila && "error")}
                name="upazila"
                value={formData.upazila}
                onChange={(event) => handleUpazilaChange(event.target.value)}
              >
                <option value="">Select Upazila / Thana</option>
                {upazilaOptions.map((upazila) => (
                  <option key={upazila.name} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila ? <span className="error-message">{errors.upazila}</span> : null}
            </label>

            {areaType === "union" ? (
              <>
                <label className="form-group">
                  <span className="form-label">Union / Area</span>
                  <select
                    className={clsx("form-input checkout-field", errors.union && "error")}
                    name="union"
                    value={formData.union}
                    onChange={(event) => setField("union", event.target.value)}
                  >
                    <option value="">Select Union</option>
                    {unionOptions.map((union) => (
                      <option key={union} value={union}>
                        {union}
                      </option>
                    ))}
                  </select>
                  {errors.union ? <span className="error-message">{errors.union}</span> : null}
                </label>

                <label className="form-group form-group--full">
                  <span className="form-label">Delivery Point / Road & House</span>
                  <input
                    className={inputClassName(Boolean(errors.deliveryPoint))}
                    name="deliveryPoint"
                    placeholder="Example: Road-5, House-12 / In front of Post Office / Main Market"
                    type="text"
                    value={formData.deliveryPoint}
                    onChange={(event) => setField("deliveryPoint", event.target.value)}
                  />
                  {errors.deliveryPoint ? <span className="error-message">{errors.deliveryPoint}</span> : null}
                </label>
              </>
            ) : (
              <label className="form-group form-group--full">
                <span className="form-label">Detailed Address</span>
                <textarea
                  className={clsx("form-input checkout-field checkout-field--textarea", errors.cityAddress && "error")}
                  name="cityAddress"
                  placeholder="Write road number, house number, floor, block, area and any extra landmark"
                  rows={4}
                  value={formData.cityAddress}
                  onChange={(event) => setField("cityAddress", event.target.value)}
                />
                {errors.cityAddress ? <span className="error-message">{errors.cityAddress}</span> : null}
              </label>
            )}
          </div>
        </div>

        <div className="checkout-form__section">
          <div className="checkout-form__section-head">
            <div>
              <p className="checkout-kicker">Savings</p>
              <h3>Coupon Code</h3>
            </div>
          </div>

          <div className="checkout-coupon">
            <label className="form-group form-group--full">
              <span className="form-label">Coupon (Optional)</span>
              <div className="checkout-coupon__row">
                <input
                  className={inputClassName(Boolean(errors.couponCode))}
                  name="couponCode"
                  placeholder="Enter coupon if you have one"
                  type="text"
                  value={formData.couponCode}
                  onChange={(event) => setField("couponCode", event.target.value)}
                />
                <Button type="button" onClick={applyCoupon}>
                  Apply Coupon
                </Button>
              </div>
              {errors.couponCode ? <span className="error-message">{errors.couponCode}</span> : null}
              {couponStatus ? <span className="success-message">{couponStatus}</span> : null}
            </label>
          </div>
        </div>

        <div className="checkout-form__section">
          <div className="checkout-form__section-head">
            <div>
              <p className="checkout-kicker">Payment</p>
              <h3>Choose Payment Method</h3>
            </div>
            <div className="checkout-icon-chip">
              <Truck size={16} />
              {areaType === "city" ? "City Delivery" : "Home Delivery"}
            </div>
          </div>

          <div className="checkout-payment-grid">
            {paymentOptions.map((option) => (
              <label
                className={clsx("checkout-payment-card", formData.paymentMethod === option.value && "is-active")}
                key={option.value}
              >
                <input
                  checked={formData.paymentMethod === option.value}
                  name="paymentMethod"
                  type="radio"
                  value={option.value}
                  onChange={(event) => setField("paymentMethod", event.target.value as PaymentMethod)}
                />
                <div>
                  <strong>{option.title}</strong>
                  <span>{option.subtitle}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.paymentMethod ? <span className="error-message">{errors.paymentMethod}</span> : null}

          <label className="form-group form-group--full">
            <span className="form-label">Order Note (Optional)</span>
            <textarea
              className="form-input checkout-field checkout-field--textarea"
              name="orderNote"
              placeholder="Write any delivery instruction if needed"
              rows={3}
              value={formData.orderNote}
              onChange={(event) => setField("orderNote", event.target.value)}
            />
          </label>
        </div>

        <div className="checkout-form__footer">
          <div className="checkout-trust">
            <BadgeCheck size={18} />
            Your order details are saved locally and validated before confirmation.
          </div>
          <Button className="checkout-submit" type="submit">
            Place Order Now
          </Button>
        </div>
      </form>

      <aside className="summary-card checkout-summary checkout-summary--premium">
        <div className="checkout-summary__head">
          <div>
            <p className="checkout-kicker">Order Summary</p>
            <h3>Complete Your Checkout</h3>
          </div>
          <span>{checkoutItems.length} item(s)</span>
        </div>

        <div className="checkout-summary__items">
          {checkoutItems.map((item) => (
            <div className="checkout-summary__item" key={item.id}>
              <div className="checkout-summary__thumb">
                <img alt={item.name} src={item.image} />
              </div>
              <div className="checkout-summary__item-copy">
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} x <CurrencyDisplay amount={item.price} />
                </span>
              </div>
              <div className="checkout-summary__item-side">
                <strong><CurrencyDisplay amount={item.quantity * item.price} /></strong>
                {checkoutItems.length > 1 ? (
                  <button
                    aria-label={`Remove ${item.name} from checkout`}
                    className="checkout-summary__remove"
                    type="button"
                    onClick={() => setCheckoutItems((current) => current.filter((entry) => entry.id !== item.id))}
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary__meta">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong><CurrencyDisplay amount={checkoutSubtotal} /></strong>
          </div>
          <div className="summary-row">
            <span>Delivery Charge</span>
            <strong><CurrencyDisplay amount={shipping} /></strong>
          </div>
          <div className="summary-row">
            <span>Coupon Discount</span>
            <strong>-<CurrencyDisplay amount={discount} /></strong>
          </div>
          <div className="summary-row summary-row--total">
            <span>Grand Total</span>
            <strong><CurrencyDisplay amount={total} /></strong>
          </div>
        </div>

        <div className="checkout-summary__notes">
          <div>
            <strong>Address Note</strong>
            <p>Choose division, district and upazila carefully so the delivery team can find you faster.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
