const numericFields = [
  "SeniorCitizen", "tenure", "MonthlyCharges", "TotalCharges",
  "PaperlessBilling", "Partner", "Dependents", "PhoneService",
  "MultipleLines", "OnlineSecurity", "OnlineBackup", "DeviceProtection",
  "TechSupport", "StreamingTV", "StreamingMovies", "gender"
];

// Categorical fields to convert
const contractOptions = ["Month-to-month", "One year", "Two year"];
const paymentOptions = [
  "Bank transfer (automatic)",
  "Credit card (automatic)",
  "Electronic check",
  "Mailed check"
];
const internetServiceOptions = ["DSL", "Fiber optic", "No"];

window.onload = () => {
  const inputsDiv = document.getElementById("inputs");

  // Create inputs for numeric/binary fields
  numericFields.forEach(field => {
    const label = document.createElement("label");
    label.textContent = field + ":";
    label.style.display = "block";
    const input = document.createElement("input");
    input.name = field;
    input.required = true;
    input.type = "number";
    input.step = "any";
    inputsDiv.appendChild(label);
    inputsDiv.appendChild(input);
  });

  // Contract select
  const contractLabel = document.createElement("label");
  contractLabel.textContent = "Contract:";
  contractLabel.style.display = "block";
  const contractSelect = document.createElement("select");
  contractSelect.name = "Contract";
  contractSelect.required = true;
  contractOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    contractSelect.appendChild(option);
  });
  inputsDiv.appendChild(contractLabel);
  inputsDiv.appendChild(contractSelect);

  // PaymentMethod select
  const paymentLabel = document.createElement("label");
  paymentLabel.textContent = "PaymentMethod:";
  paymentLabel.style.display = "block";
  const paymentSelect = document.createElement("select");
  paymentSelect.name = "PaymentMethod";
  paymentSelect.required = true;
  paymentOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    paymentSelect.appendChild(option);
  });
  inputsDiv.appendChild(paymentLabel);
  inputsDiv.appendChild(paymentSelect);

  // InternetService select
  const internetLabel = document.createElement("label");
  internetLabel.textContent = "InternetService:";
  internetLabel.style.display = "block";
  const internetSelect = document.createElement("select");
  internetSelect.name = "InternetService";
  internetSelect.required = true;
  internetServiceOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    internetSelect.appendChild(option);
  });
  inputsDiv.appendChild(internetLabel);
  inputsDiv.appendChild(internetSelect);
};

document.getElementById("predictForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  // Parse numeric fields
  const data = {};
  for (const field of numericFields) {
    const val = parseFloat(form[field].value);
    if (isNaN(val)) {
      alert(`Invalid input for ${field}`);
      return;
    }
    data[field] = val;
  }

  // One-hot encode Contract
  const contract = form.Contract.value;
  data["Contract_Month-to-month"] = contract === "Month-to-month" ? 1 : 0;
  data["Contract_One year"] = contract === "One year" ? 1 : 0;
  data["Contract_Two year"] = contract === "Two year" ? 1 : 0;

  // One-hot encode PaymentMethod
  const payment = form.PaymentMethod.value;
  data["PaymentMethod_Bank transfer (automatic)"] = payment === "Bank transfer (automatic)" ? 1 : 0;
  data["PaymentMethod_Credit card (automatic)"] = payment === "Credit card (automatic)" ? 1 : 0;
  data["PaymentMethod_Electronic check"] = payment === "Electronic check" ? 1 : 0;
  data["PaymentMethod_Mailed check"] = payment === "Mailed check" ? 1 : 0;

  // One-hot encode InternetService
  const internet = form.InternetService.value;
  data["InternetService_DSL"] = internet === "DSL" ? 1 : 0;
  data["InternetService_Fiber optic"] = internet === "Fiber optic" ? 1 : 0;
  data["InternetService_No"] = internet === "No" ? 1 : 0;

  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.error) {
      document.getElementById("result").textContent = "Error: " + result.error;
    } else {
      document.getElementById("result").textContent =
        result.prediction === 1 ? "🚨 Churn: Yes" : "✅ Churn: No";
    }
  } catch (err) {
    document.getElementById("result").textContent = "Fetch failed: " + err.message;
  }
});
