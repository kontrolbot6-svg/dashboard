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
      <p class="placeholder">Phase 1 (index-by-index): <strong>case_involve_dev_v1</strong> only — scoped to the <strong>selected profile</strong>.</p>

      <div class="kpi-grid" id="ceh-kpis"></div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>Case Involvement Added Over Time (Selected Profile)</h3>
          <canvas id="ceh-case-monthly" width="700" height="260"></canvas>
        </div>
        <div class="chart-card">
          <h3>Involvement Type Mix (Selected Profile)</h3>
          <canvas id="ceh-caseinvolve-mix" width="420" height="260"></canvas>
        </div>
      </div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>Age Band Distribution (Selected Profile)</h3>
          <canvas id="ceh-case-agebands" width="700" height="260"></canvas>
        </div>
        <div class="chart-card">
          <h3>Gender Mix (Selected Profile)</h3>
          <canvas id="ceh-case-gender" width="420" height="260"></canvas>
        </div>
      </div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>Top Nationalities (Selected Profile)</h3>
          <canvas id="ceh-case-nationality" width="700" height="260"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <h3>Visualization Field Mapping</h3>
        <div id="ceh-mapping"></div>
      </div>

      <div class="chart-card">
        <h3>All Enforcement Records</h3>
        <div class="table-wrap">
          <table class="records-table">
            <thead>
              <tr>
                <th>Source Index</th>
                <th>Record ID</th>
                <th>Date/Time</th>
                <th>Event Type</th>
                <th>Location</th>
                <th>Officer</th>
              </tr>
            </thead>
            <tbody id="ceh-records"></tbody>
          </table>
        </div>
      </div>
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

const caseEnforcementData = {
  incidents_dev_v1: {
    total: 27,
    monthly: [
      { month: "Apr", value: 1 },
      { month: "May", value: 2 },
      { month: "Jun", value: 2 },
      { month: "Jul", value: 3 },
      { month: "Aug", value: 2 },
      { month: "Sep", value: 3 },
      { month: "Oct", value: 3 },
      { month: "Nov", value: 2 },
      { month: "Dec", value: 2 },
      { month: "Jan", value: 3 },
      { month: "Feb", value: 2 },
      { month: "Mar", value: 2 },
    ],
    crimeTypeMix: [
      { label: "Assault", value: 9, color: "#38bdf8" },
      { label: "Theft", value: 7, color: "#22c55e" },
      { label: "Drug", value: 6, color: "#f59e0b" },
      { label: "Public Order", value: 5, color: "#a78bfa" },
    ],
  },
  arrests_dev_v1: {
    total: 14,
    timingHeatmap: [
      [0, 0, 1, 2, 2, 1],
      [0, 1, 1, 2, 1, 1],
      [0, 0, 2, 2, 3, 1],
      [0, 1, 2, 3, 3, 2],
      [0, 1, 1, 2, 2, 1],
      [0, 1, 2, 1, 1, 1],
      [0, 0, 1, 1, 1, 0],
    ],
  },
  case_involve_dev_v1: {
    total: 43,
    monthlyAdded: [
      { month: "Apr", value: 2 },
      { month: "May", value: 3 },
      { month: "Jun", value: 4 },
      { month: "Jul", value: 5 },
      { month: "Aug", value: 3 },
      { month: "Sep", value: 5 },
      { month: "Oct", value: 4 },
      { month: "Nov", value: 3 },
      { month: "Dec", value: 4 },
      { month: "Jan", value: 4 },
      { month: "Feb", value: 3 },
      { month: "Mar", value: 3 },
    ],
    involvementMix: [
      { label: "Suspect", value: 18, color: "#22c55e" },
      { label: "Witness", value: 11, color: "#38bdf8" },
      { label: "Victim", value: 9, color: "#f43f5e" },
      { label: "Other", value: 5, color: "#a78bfa" },
    ],
    ageBands: [
      { label: "<18", value: 3 },
      { label: "18-24", value: 10 },
      { label: "25-34", value: 14 },
      { label: "35-44", value: 9 },
      { label: "45+", value: 7 },
    ],
    genderMix: [
      { label: "Male", value: 31, color: "#38bdf8" },
      { label: "Female", value: 10, color: "#f472b6" },
      { label: "Unknown", value: 2, color: "#94a3b8" },
    ],
    nationalityTop: [
      { label: "Maldivian", value: 33 },
      { label: "Bangladeshi", value: 4 },
      { label: "Indian", value: 3 },
      { label: "Sri Lankan", value: 2 },
      { label: "Other", value: 1 },
    ],
  },
  location_checks_dev_v1: {
    total: 22,
    geoClusters: [
      { label: "Male'", value: 8 },
      { label: "Hulhumale", value: 6 },
      { label: "Addu City", value: 4 },
      { label: "Fuvahmulah", value: 2 },
      { label: "Kulhudhuffushi", value: 2 },
    ],
    placeTypeMix: [
      { label: "Street", value: 8, color: "#38bdf8" },
      { label: "Port", value: 5, color: "#22c55e" },
      { label: "Residence", value: 4, color: "#f59e0b" },
      { label: "Checkpoint", value: 5, color: "#a78bfa" },
    ],
  },
  records: [
    { sourceIndex: "incidents_dev_v1", personId: "PID-99999", recordId: "INC-99231", dateTime: "2026-03-20 19:42", eventType: "Incident - Assault", location: "Male'", officer: "SN-2041" },
    { sourceIndex: "case_involve_dev_v1", personId: "PID-00001", recordId: "INV-5712", dateTime: "2026-03-20 20:10", eventType: "Case Involvement - Suspect", location: "Male'", officer: "-" },
    { sourceIndex: "case_involve_dev_v1", personId: "PID-00001", recordId: "INV-5718", dateTime: "2026-02-14 16:40", eventType: "Case Involvement - Witness", location: "Male'", officer: "-" },
    { sourceIndex: "arrests_dev_v1", personId: "PID-00001", recordId: "ARR-1330", dateTime: "2026-03-18 00:15", eventType: "Arrest - Theft", location: "Male'", officer: "SN-2041" },
    { sourceIndex: "location_checks_dev_v1", personId: "PID-00001", recordId: "LCK-8872", dateTime: "2026-03-12 18:20", eventType: "Location Check", location: "Addu City", officer: "SN-5512" },
  ],
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

function drawLineChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = { top: 25, right: 25, bottom: 35, left: 35 };
  const iw = w - padding.left - padding.right;
  const ih = h - padding.top - padding.bottom;

  const totals = data.map((d) => d.incidents + d.arrests + d.checks);
  const maxVal = Math.max(...totals, 1);

  ctx.strokeStyle = "#334155";
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, h - padding.bottom);
  ctx.lineTo(w - padding.right, h - padding.bottom);
  ctx.stroke();

  const stepX = iw / (data.length - 1);
  ctx.beginPath();
  totals.forEach((value, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + ih - (value / maxVal) * ih;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;
  ctx.stroke();

  totals.forEach((value, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + ih - (value / maxVal) * ih;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    if (i % 2 === 0) ctx.fillText(data[i].month, x, h - 12);
  });
}

function drawDonutChart(canvasId, items) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.34;

  ctx.clearRect(0, 0, w, h);
  const total = items.reduce((s, i) => s + i.value, 0) || 1;

  let start = -Math.PI / 2;
  items.forEach((item, idx) => {
    const slice = (item.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    start += slice;

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillRect(20, 20 + idx * 20, 10, 10);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`${item.label} (${item.value})`, 36, 29 + idx * 20);
  });

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.54, 0, Math.PI * 2);
  ctx.fillStyle = "#0f172a";
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.font = "700 20px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${total}`, cx, cy + 6);
}

function drawHorizontalBars(canvasId, data, barColor = "#38bdf8") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = { top: 20, right: 20, bottom: 15, left: 140 };
  const iw = w - padding.left - padding.right;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const rowH = (h - padding.top - padding.bottom) / data.length;

  data.forEach((d, i) => {
    const y = padding.top + i * rowH + rowH * 0.2;
    const barH = rowH * 0.6;
    const barW = (d.value / maxVal) * iw;

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(padding.left, y, iw, barH);

    ctx.fillStyle = barColor;
    ctx.fillRect(padding.left, y, barW, barH);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(d.label, padding.left - 8, y + barH * 0.72);

    ctx.textAlign = "left";
    ctx.fillText(d.value, padding.left + barW + 6, y + barH * 0.72);
  });
}

function drawPulseChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = { top: 20, right: 20, bottom: 32, left: 40 };
  const iw = w - padding.left - padding.right;
  const ih = h - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => Math.max(d.incidents, d.arrests)), 1);
  const step = iw / data.length;

  data.forEach((d, i) => {
    const baseX = padding.left + i * step + 8;
    const barW = Math.max(6, step * 0.32);

    const ihInc = (d.incidents / maxVal) * ih;
    const ihArr = (d.arrests / maxVal) * ih;

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(baseX, h - padding.bottom - ihInc, barW, ihInc);

    ctx.fillStyle = "#f43f5e";
    ctx.fillRect(baseX + barW + 4, h - padding.bottom - ihArr, barW, ihArr);

    if (i % 2 === 0) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.month, baseX + barW, h - 10);
    }
  });

  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(12, 8, 10, 10);
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "12px Inter, sans-serif";
  ctx.fillText("Incidents", 28, 17);

  ctx.fillStyle = "#f43f5e";
  ctx.fillRect(110, 8, 10, 10);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("Arrests", 126, 17);
}

function drawSimpleLineChart(canvasId, data, color = "#38bdf8") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = { top: 22, right: 22, bottom: 32, left: 34 };
  const iw = w - padding.left - padding.right;
  const ih = h - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const stepX = iw / (data.length - 1 || 1);

  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, h - padding.bottom);
  ctx.lineTo(w - padding.right, h - padding.bottom);
  ctx.strokeStyle = "#334155";
  ctx.stroke();

  ctx.beginPath();
  data.forEach((d, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + ih - (d.value / maxVal) * ih;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  data.forEach((d, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + ih - (d.value / maxVal) * ih;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (i % 2 === 0) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.month, x, h - 10);
    }
  });
}

function drawBubbleClusters(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  data.forEach((d, i) => {
    const x = 70 + (i % 3) * 120 + (i * 11) % 18;
    const y = 70 + Math.floor(i / 3) * 110;
    const r = 14 + (d.value / maxVal) * 28;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34,197,94,${0.3 + (d.value / maxVal) * 0.5})`;
    ctx.fill();
    ctx.strokeStyle = "#22c55e";
    ctx.stroke();

    ctx.fillStyle = "#d1d5db";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(d.label, x, y + r + 14);
    ctx.fillText(String(d.value), x, y + 4);
  });
}

function drawFunnelChart(canvasId, stages) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const max = Math.max(...stages.map((s) => s.value), 1);
  const stepH = (h - 30) / stages.length;

  stages.forEach((s, i) => {
    const topW = ((stages[i - 1]?.value || max) / max) * (w - 80);
    const botW = (s.value / max) * (w - 80);
    const y = 15 + i * stepH;

    ctx.beginPath();
    ctx.moveTo((w - topW) / 2, y);
    ctx.lineTo((w + topW) / 2, y);
    ctx.lineTo((w + botW) / 2, y + stepH - 6);
    ctx.lineTo((w - botW) / 2, y + stepH - 6);
    ctx.closePath();
    ctx.fillStyle = ["#22c55e", "#38bdf8", "#f43f5e", "#a78bfa"][i % 4];
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${s.label}: ${s.value}`, w / 2, y + stepH / 2);
  });
}

function drawTimingHeatmap(canvasId, matrix) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const rows = matrix.length;
  const cols = matrix[0].length;
  const max = Math.max(...matrix.flat(), 1);
  const cellW = (w - 40) / cols;
  const cellH = (h - 35) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = matrix[r][c];
      const alpha = 0.15 + (val / max) * 0.85;
      ctx.fillStyle = `rgba(245,158,11,${alpha})`;
      ctx.fillRect(30 + c * cellW, 8 + r * cellH, cellW - 2, cellH - 2);
    }
  }

  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px Inter, sans-serif";
  ctx.fillText("Mon..Sun vs Time bands", 10, h - 6);
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

function renderCaseEnforcement(profile) {
  const kpiRoot = document.getElementById("ceh-kpis");
  if (!kpiRoot) return;

  const kpis = [
    { label: "Index", value: "case_involve_dev_v1" },
    { label: "Total Records", value: caseEnforcementData.case_involve_dev_v1.total },
    { label: "Primary Type", value: "Suspect" },
    { label: "Primary Nationality", value: "Maldivian" },
  ];

  kpiRoot.innerHTML = kpis
    .map(
      (k) => `
      <div class="kpi-card">
        <span class="kpi-label">${k.label}</span>
        <strong class="kpi-value">${k.value}</strong>
      </div>
    `,
    )
    .join("");

  drawSimpleLineChart("ceh-case-monthly", caseEnforcementData.case_involve_dev_v1.monthlyAdded, "#22c55e");
  drawDonutChart("ceh-caseinvolve-mix", caseEnforcementData.case_involve_dev_v1.involvementMix);
  drawHorizontalBars("ceh-case-agebands", caseEnforcementData.case_involve_dev_v1.ageBands, "#38bdf8");
  drawDonutChart("ceh-case-gender", caseEnforcementData.case_involve_dev_v1.genderMix);
  drawHorizontalBars("ceh-case-nationality", caseEnforcementData.case_involve_dev_v1.nationalityTop, "#a78bfa");

  const mappingRoot = document.getElementById("ceh-mapping");
  if (mappingRoot) {
    mappingRoot.innerHTML = `
      <div class="table-wrap">
        <table class="records-table mapping-table">
          <thead>
            <tr>
              <th>Visualization</th>
              <th>Index</th>
              <th>Fields Used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Case Involvement Added Over Time</td>
              <td>case_involve_dev_v1</td>
              <td>added_date, involve_id_pk</td>
            </tr>
            <tr>
              <td>Involvement Type Mix</td>
              <td>case_involve_dev_v1</td>
              <td>involvement_type, involve_id_pk</td>
            </tr>
            <tr>
              <td>Age Band Distribution</td>
              <td>case_involve_dev_v1</td>
              <td>age, involve_id_pk</td>
            </tr>
            <tr>
              <td>Gender Mix</td>
              <td>case_involve_dev_v1</td>
              <td>gender, involve_id_pk</td>
            </tr>
            <tr>
              <td>Top Nationalities</td>
              <td>case_involve_dev_v1</td>
              <td>nationality_eng, nationality_code, involve_id_pk</td>
            </tr>
            <tr>
              <td>Records Table</td>
              <td>case_involve_dev_v1</td>
              <td>person_id / id_card_number / passport_number linkage + involve_id_pk, incident_id, added_date, full_name_eng, gender, age, nationality_eng, involvement_type</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  const recordsRoot = document.getElementById("ceh-records");
  if (recordsRoot) {
    const caseOnly = caseEnforcementData.records.filter(
      (r) => r.sourceIndex === "case_involve_dev_v1" && r.personId === profile.person_id,
    );
    recordsRoot.innerHTML = caseOnly
      .map(
        (r) => `
        <tr>
          <td>${r.sourceIndex}</td>
          <td>${r.recordId}</td>
          <td>${r.dateTime}</td>
          <td>${r.eventType}</td>
          <td>${r.location}</td>
          <td>${r.officer}</td>
        </tr>
      `,
      )
      .join("");
  }
}

function renderTabContent(tab, profile) {
  const contentRoot = document.getElementById("tab-content");
  contentRoot.innerHTML = tab.content;

  if (tab.id === "profile-summary") {
    renderOverview(profile);
  }

  if (tab.id === "case-enforcement-history") {
    renderCaseEnforcement(profile);
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
