import { useState } from "react";
import {
  FiX,
  FiCheckCircle,
  FiCreditCard,
  FiSmartphone,
  FiSend,
} from "react-icons/fi";

export default function PaymentModal({ open, onClose, notice }) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [mode, setMode] = useState("support");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!open) return null;

  const orgName = notice?.organization?.name || "partnerska organizacja";
  const presetAmounts = mode === "meal" ? [1, 2, 5] : [20, 50, 100, 200];
  const MEAL_PRICE = 30;

  const headerLabel = mode === "meal" ? "Opłać posiłek" : "Wesprzyj finansowo";

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsLoading(false);
    setAmount("");
    setMode("support");
    setSelectedMethod("card");
    onClose && onClose();
  };

  const handlePresetClick = (value) => {
    setAmount(String(value));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (Number(value) < 0) return;
    setAmount(value);
  };

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0 || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const isSubmitDisabled = !amount || Number(amount) <= 0 || isLoading;

  const supportDescription =
    mode === "meal"
      ? "Opłać wybraną liczbę posiłków dla wolontariuszy."
      : `Twoje wsparcie zostanie przekazane bezpośrednio organizacji ${orgName} na realizację tego działania.`;

  const successDescription =
    mode === "meal"
      ? `Opłacono ${amount} ${pluralMeal(amount)} dla wolontariuszy. Dziękujemy za wsparcie!`
      : `Pieniądze zostały przekazane organizacji ${orgName}. Dziękujemy za wsparcie!`;

  function pluralMeal(n) {
    const num = Number(n);
    if (num === 1) return "posiłek";
    if (num > 1 && num < 5) return "posiłki";
    return "posiłków";
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md mx-4 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {headerLabel}
            </p>
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              {notice?.title || "Wsparcie ogłoszenia"}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Organizacja: <span className="font-medium">{orgName}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 transition"
          >
            <FiX className="text-sm" />
          </button>
        </div>

        <div className="px-5 pt-4 pb-6 space-y-4">
          {!isSuccess && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("support")}
                className={
                  "flex-1 px-3 py-1.5 rounded-2xl text-[11px] font-semibold border transition " +
                  (mode === "support"
                    ? "border-accentBlue bg-accentBlue/10 text-accentBlue"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300")
                }
              >
                Wesprzyj akcję
              </button>
              <button
                type="button"
                onClick={() => setMode("meal")}
                className={
                  "flex-1 px-3 py-1.5 rounded-2xl text-[11px] font-semibold border transition " +
                  (mode === "meal"
                    ? "border-accentGreen bg-accentGreen/10 text-accentGreen"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300")
                }
              >
                Opłać posiłek
              </button>
            </div>
          )}

          <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {mode === "meal" ? "Wybierz ilość posiłków" : "Wybierz kwotę wsparcia"}
          </p>

          {isSuccess ? (
            <div className="text-center py-8">
              <FiCheckCircle className="mx-auto text-accentGreen text-5xl mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Wsparcie zostało przekazane
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                {successDescription}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold bg-accentBlue text-white hover:bg-accentBlue/90 active:translate-y-[1px] transition-all"
              >
                OK
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map((value) => {
                  const isActive = amount === String(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handlePresetClick(value)}
                      className={
                        "px-2 py-1.5 rounded-xl text-xs font-semibold border transition " +
                        (isActive
                          ? "border-accentGreen bg-accentGreen/10 text-accentGreen"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 hover:bg-accentGreen/5 hover:border-accentGreen/60")
                      }
                    >
                      {mode === "meal"
                        ? `${value} ${pluralMeal(value)}`
                        : `${value} zł`}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-end gap-2">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={mode === "meal" ? "1" : "50"}
                  className="flex-1 bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 
                             focus:border-accentBlue focus:outline-none focus:ring-0
                             pb-1 text-2xl sm:text-3xl font-semibold text-right
                             text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <span className="pb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {mode === "meal" ? "posiłków" : "PLN"}
                </span>
              </div>

              {mode === "meal" && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  1 posiłek kosztuje 30 zł
                </p>
              )}

              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Wybierz metodę płatności
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("card")}
                    className={
                      "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition " +
                      (selectedMethod === "card"
                        ? "border-accentBlue bg-accentBlue/10 text-accentBlue"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-200")
                    }
                  >
                    <FiCreditCard className="text-xs" />
                    Karta
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("blik")}
                    className={
                      "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition " +
                      (selectedMethod === "blik"
                        ? "border-accentBlue bg-accentBlue/10 text-accentBlue"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-200")
                    }
                  >
                    <FiSmartphone className="text-xs" />
                    BLIK
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("transfer")}
                    className={
                      "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition " +
                      (selectedMethod === "transfer"
                        ? "border-accentBlue bg-accentBlue/10 text-accentBlue"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-200")
                    }
                  >
                    <FiSend className="text-xs" />
                    Przelew
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {supportDescription}
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={
                  "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-soft active:translate-y-[1px] transition-all " +
                  (isSubmitDisabled
                    ? "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-not-allowed"
                    : "bg-accentGreen/90 hover:bg-accentGreen text-white")
                }
              >
                {isLoading
                  ? "Przetwarzanie..."
                  : mode === "meal"
                  ? "Opłać posiłek"
                  : "Dokonaj płatności"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
