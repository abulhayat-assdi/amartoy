import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";

export default function OrderSuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Order Received"
        title="Thank you. Your order has been received."
        description="A friendly confirmation screen with order pills and a simple next step back into the catalog."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Order Success" },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="success-card">
            <div className="success-check">
              <CheckCheck size={48} />
            </div>
            <h2>Thank you. Your order has been received.</h2>
            <div className="success-pills">
              <div>
                <span>Order Number</span>
                <strong>#AT-20394</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>Apr 17, 2026</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>hello@amartoy.com</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>$184.00</strong>
              </div>
            </div>
            <div className="detail-card success-table">
              <div className="summary-row">
                <span>Blocks Builder × 1</span>
                <strong>$110.00</strong>
              </div>
              <div className="summary-row">
                <span>Teddy Bear Toy × 1</span>
                <strong>$70.00</strong>
              </div>
              <div className="summary-row summary-row--total">
                <span>Grand Total</span>
                <strong>$184.00</strong>
              </div>
            </div>
            <Button href="/shop/">Continue Shopping</Button>
          </div>
        </div>
      </section>
    </>
  );
}
