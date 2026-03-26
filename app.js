const tabs = [
  {
    id: "profile-summary",
    label: "Overview",
    content: `
      <h2>Overview</h2>
      <div class="overview-chart-wrap">
        <h3>Activity Indicators Radar</h3>
        <canvas id="overview-radar" width="520" height="320"></canvas>
      </div>
    `,
  },
  {
    id: "case-enforcement-history",
    label: "Case & Enforcement History",
    content: `
      <h2>Case & Enforcement History</h2>
      <p class="placeholder">Timeline and linked records from case, incidents, arrests, stop & search, checks, and visits will appear here.</p>
    `,
  },
  {
    id: "interactions-associations",
    label: "Interactions & Associations",
    content: `
      <h2>Interactions & Associations</h2>
      <p class="placeholder">Interaction graph/list and relationship insights will render here.</p>
    `,
  },
  {
    id: "mobility-border-movement",
    label: "Mobility & Border Movement",
    content: `
      <h2>Mobility & Border Movement</h2>
      <p class="placeholder">Crossings, travel patterns, and movement visualizations will render here.</p>
    `,
  },
  {
    id: "vehicles-traffic-compliance",
    label: "Vehicles & Traffic Compliance",
    content: `
      <h2>Vehicles & Traffic Compliance</h2>
      <p class="placeholder">Vehicle links plus traffic/parking violation views will render here.</p>
    `,
  },
  {
    id: "maritime-assets",
    label: "Maritime Assets",
    content: `
      <h2>Maritime Assets</h2>
      <p class="placeholder">Vessel ownership and maritime profile context will render here.</p>
    `,
  },
  {
    id: "business-links",
    label: "Business Links",
    content: `
      <h2>Business Links</h2>
      <p class="placeholder">Business entities and economic link analysis will render here.</p>
    `,
  },
];

const sampleProfile = {
  full_name_eng: "Sample Person",
  full_name_dhi: "ސާމްޕަލް ޕާސަން",
  person_id: "PID-00001",
  id_card_number: "A123456",
  passport_number: "P987654",
  latest_photo: "https://via.placeholder.com/260x260?text=Profile+Photo",
  risk_score: 72.4,
  risk_score_band: "High",
  offender_category: "Repeat Offender",
  is_gang_affiliated: "Yes",
  is_gang_member: "No",
  gang_name: "-",
  max_single_crime_severity: "Severe",
  date_of_birth: "1991-04-20",
  age: 34,
  gender: "Male",
  nationality_eng: "Maldivian",
  foreigner_flag: "No",
  residency_status: "Resident",
  mobile_number: "+960-7000000",
  phone_number: "+960-3000000",
  email: "sample.person@example.com",
  address: "Male', Maldives",
  inside_outside_country_indicator: "Inside",
  times_arrested_last_180d: 2,
  times_arrested_before_180d: 5,
  arrested_recency: "Within 30 days",
  times_involved_last_180d: 4,
  times_involved_before_180d: 7,
  incident_involve_recency: "Within 7 days",
  times_travel_to_risky_countries_last_90d: 1,
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value === null || value === undefined || value === "" ? "-" : value;
}

function bindProfile(profile) {
  setText("full-name-eng", profile.full_name_eng);
  setText("full-name-dhi", profile.full_name_dhi);
  setText("person-id", profile.person_id);
  setText("id-card", profile.id_card_number);
  setText("passport", profile.passport_number);

  document.getElementById("profile-photo").src =
    profile.latest_photo || "https://via.placeholder.com/260x260?text=No+Image";

  setText("risk-score", profile.risk_score);
  setText("risk-band", profile.risk_score_band);
  setText("offender-category", profile.offender_category);
  setText("gang-affiliated", profile.is_gang_affiliated);
  setText("gang-member", profile.is_gang_member);
  setText("gang-name", profile.gang_name);
  setText("max-crime-severity", profile.max_single_crime_severity);

  setText("dob", profile.date_of_birth);
  setText("age", profile.age);
  setText("gender", profile.gender);
  setText("nationality", profile.nationality_eng);
  setText("foreigner-flag", profile.foreigner_flag);
  setText("residency-status", profile.residency_status);

  setText("mobile-number", profile.mobile_number);
  setText("phone-number", profile.phone_number);
  setText("email", profile.email);
  setText("address", profile.address);
  setText("inside-outside", profile.inside_outside_country_indicator);

  setText("arrests-last-180", profile.times_arrested_last_180d);
  setText("arrests-before-180", profile.times_arrested_before_180d);
  setText("arrest-recency", profile.arrested_recency);
  setText("involved-last-180", profile.times_involved_last_180d);
  setText("involved-before-180", profile.times_involved_before_180d);
  setText("incident-recency", profile.incident_involve_recency);
  setText("travel-risky-90", profile.times_travel_to_risky_countries_last_90d);
}

function drawRadarChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.33;
  const steps = 5;

  ctx.clearRect(0, 0, w, h);

  // Grid
  for (let s = 1; s <= steps; s++) {
    const r = (radius * s) / steps;
    ctx.beginPath();
    labels.forEach((_, i) => {
      const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#2f3b4f";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Axes + labels
  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#334155";
    ctx.stroke();

    const lx = cx + (radius + 22) * Math.cos(angle);
    const ly = cy + (radius + 22) * Math.sin(angle);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, lx, ly);
  });

  // Data polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const vr = radius * Math.max(0, Math.min(1, v));
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const x = cx + vr * Math.cos(angle);
    const y = cy + vr * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(34,197,94,0.28)";
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
}

function renderOverview(profile) {
  const labels = [
    "Arrests 180d",
    "Arrests <180d",
    "Arrest Recency",
    "Incidents 180d",
    "Incidents <180d",
    "Incident Recency",
    "Risky Travel 90d",
  ];

  const arrestRecencyScore = (profile.arrested_recency || "").toLowerCase().includes("30") ? 0.8 : 0.4;
  const incidentRecencyScore = (profile.incident_involve_recency || "").toLowerCase().includes("7") ? 1 : 0.5;

  const values = [
    Math.min((profile.times_arrested_last_180d || 0) / 10, 1),
    Math.min((profile.times_arrested_before_180d || 0) / 20, 1),
    arrestRecencyScore,
    Math.min((profile.times_involved_last_180d || 0) / 15, 1),
    Math.min((profile.times_involved_before_180d || 0) / 25, 1),
    incidentRecencyScore,
    Math.min((profile.times_travel_to_risky_countries_last_90d || 0) / 6, 1),
  ];

  drawRadarChart("overview-radar", labels, values);
}

function renderTabContent(tab, profile) {
  const contentRoot = document.getElementById("tab-content");
  contentRoot.innerHTML = tab.content;
  if (tab.id === "profile-summary") {
    renderOverview(profile);
  }
}

function renderTabs(profile) {
  const tabsRoot = document.getElementById("tabs");

  tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    button.className = `tab-btn ${index === 0 ? "active" : ""}`;
    button.textContent = tab.label;
    button.dataset.tabId = tab.id;

    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderTabContent(tab, profile);
    });

    tabsRoot.appendChild(button);
  });

  renderTabContent(tabs[0], profile);
}

bindProfile(sampleProfile);
renderTabs(sampleProfile);
