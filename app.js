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
      <p class="placeholder">Case progression narrative across cases, incidents, arrests, stop-search, location checks, and NSO touchpoints.</p>

      <div class="kpi-grid" id="ceh-kpis"></div>
      <div class="narrative-strip" id="ceh-narrative"></div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>12-Month Enforcement Intensity (Incidents + Arrests + Checks + Stops + NSO)</h3>
          <canvas id="ceh-trend" width="700" height="280"></canvas>
        </div>
        <div class="chart-card">
          <h3>Event Type Mix</h3>
          <canvas id="ceh-mix" width="420" height="280"></canvas>
        </div>
      </div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>Incident vs Arrest Pulse</h3>
          <canvas id="ceh-pulse" width="700" height="260"></canvas>
        </div>
        <div class="chart-card">
          <h3>Location Hotspots</h3>
          <canvas id="ceh-hotspots" width="420" height="260"></canvas>
        </div>
      </div>

      <div class="case-grid">
        <div class="chart-card">
          <h3>Top Case Linkages</h3>
          <canvas id="ceh-case-link" width="700" height="260"></canvas>
        </div>
        <div class="chart-card">
          <h3>Officer Touchpoints</h3>
          <canvas id="ceh-officers" width="420" height="260"></canvas>
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
  totals: {
    incidents: 27,
    arrests: 14,
    caseInvolvements: 43,
    stopSearches: 18,
    locationChecks: 22,
    nsoVisits: 11,
  },
  caseLinks: [
    { label: "CASE-8841", value: 9 },
    { label: "CASE-7712", value: 7 },
    { label: "CASE-9033", value: 6 },
    { label: "CASE-6620", value: 5 },
    { label: "CASE-1182", value: 4 },
  ],
  records: [
    {
      sourceIndex: "incidents_dev_v1",
      recordId: "INC-99231",
      dateTime: "2026-03-20 19:42",
      eventType: "Incident - Assault",
      location: "Male'",
      officer: "SN-2041",
    },
    {
      sourceIndex: "case_involve_dev_v1",
      recordId: "INV-5712",
      dateTime: "2026-03-20 20:10",
      eventType: "Case Involvement - Suspect",
      location: "Male'",
      officer: "-",
    },
    {
      sourceIndex: "arrests_dev_v1",
      recordId: "ARR-1330",
      dateTime: "2026-03-18 00:15",
      eventType: "Arrest - Theft",
      location: "Male'",
      officer: "SN-2041",
    },
    {
      sourceIndex: "sns_person_dev_v1",
      recordId: "SSP-4110",
      dateTime: "2026-03-17 23:05",
      eventType: "Stop & Search",
      location: "Hulhumale",
      officer: "SN-1188",
    },
    {
      sourceIndex: "location_checks_dev_v1",
      recordId: "LCK-8872",
      dateTime: "2026-03-12 18:20",
      eventType: "Location Check",
      location: "Addu City",
      officer: "SN-5512",
    },
    {
      sourceIndex: "nso_visits_dev_v1",
      recordId: "VIS-2291",
      dateTime: "2026-03-05 14:35",
      eventType: "NSO Visit",
      location: "Fuvahmulah",
      officer: "SN-9402",
    },
  ],
  monthlyTrend: [
    { month: "Apr", incidents: 1, arrests: 0, stopSearches: 0, checks: 1, visits: 0 },
    { month: "May", incidents: 2, arrests: 1, stopSearches: 1, checks: 1, visits: 0 },
    { month: "Jun", incidents: 2, arrests: 1, stopSearches: 1, checks: 2, visits: 1 },
    { month: "Jul", incidents: 3, arrests: 2, stopSearches: 2, checks: 2, visits: 1 },
    { month: "Aug", incidents: 2, arrests: 1, stopSearches: 1, checks: 2, visits: 1 },
    { month: "Sep", incidents: 3, arrests: 2, stopSearches: 2, checks: 3, visits: 1 },
    { month: "Oct", incidents: 3, arrests: 2, stopSearches: 2, checks: 2, visits: 1 },
    { month: "Nov", incidents: 2, arrests: 1, stopSearches: 1, checks: 2, visits: 1 },
    { month: "Dec", incidents: 2, arrests: 1, stopSearches: 2, checks: 2, visits: 1 },
    { month: "Jan", incidents: 3, arrests: 1, stopSearches: 2, checks: 2, visits: 2 },
    { month: "Feb", incidents: 2, arrests: 1, stopSearches: 2, checks: 2, visits: 1 },
    { month: "Mar", incidents: 2, arrests: 1, stopSearches: 2, checks: 1, visits: 1 },
  ],
  eventMix: [
    { label: "Case Involvement", value: 43, color: "#22c55e" },
    { label: "Incidents", value: 27, color: "#38bdf8" },
    { label: "Arrests", value: 14, color: "#f43f5e" },
    { label: "Location Checks", value: 22, color: "#a78bfa" },
    { label: "Stop & Search", value: 18, color: "#f59e0b" },
    { label: "NSO Visits", value: 11, color: "#ef4444" },
  ],
  hotspots: [
    { label: "Male'", value: 24 },
    { label: "Hulhumale", value: 16 },
    { label: "Addu City", value: 9 },
    { label: "Fuvahmulah", value: 7 },
    { label: "Kulhudhuffushi", value: 5 },
  ],
  officerTouchpoints: [
    { label: "SN-2041", value: 12 },
    { label: "SN-1188", value: 9 },
    { label: "SN-5512", value: 7 },
    { label: "SN-9402", value: 5 },
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

  const totals = data.map((d) => d.incidents + d.arrests + d.stopSearches + d.checks + d.visits);
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

  const totalEnforcementEvents =
    caseEnforcementData.totals.incidents +
    caseEnforcementData.totals.arrests +
    caseEnforcementData.totals.caseInvolvements +
    caseEnforcementData.totals.stopSearches +
    caseEnforcementData.totals.locationChecks +
    caseEnforcementData.totals.nsoVisits;

  const kpis = [
    { label: "Total Enforcement Events", value: totalEnforcementEvents },
    { label: "Case Involvements", value: caseEnforcementData.totals.caseInvolvements },
    { label: "Incidents", value: caseEnforcementData.totals.incidents },
    { label: "Arrests", value: caseEnforcementData.totals.arrests },
    { label: "Stop & Search", value: caseEnforcementData.totals.stopSearches },
    { label: "Location Checks", value: caseEnforcementData.totals.locationChecks },
    { label: "NSO Visits", value: caseEnforcementData.totals.nsoVisits },
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

  const peak = caseEnforcementData.monthlyTrend.reduce((a, b) => {
    const aVal = a.incidents + a.arrests + a.stopSearches + a.checks + a.visits;
    const bVal = b.incidents + b.arrests + b.stopSearches + b.checks + b.visits;
    return bVal > aVal ? b : a;
  });

  const narrativeRoot = document.getElementById("ceh-narrative");
  if (narrativeRoot) {
    narrativeRoot.innerHTML = `
      <div class="n-card"><span class="n-k">1</span><div><strong>Entry:</strong> ${caseEnforcementData.totals.caseInvolvements} case linkages identify repeated legal touchpoints.</div></div>
      <div class="n-card"><span class="n-k">2</span><div><strong>Escalation:</strong> ${caseEnforcementData.totals.incidents} incidents progressed to ${caseEnforcementData.totals.arrests} arrests.</div></div>
      <div class="n-card"><span class="n-k">3</span><div><strong>Pressure point:</strong> ${peak.month} is peak enforcement intensity month.</div></div>
      <div class="n-card"><span class="n-k">4</span><div><strong>Ground activity:</strong> ${caseEnforcementData.totals.stopSearches} stop-search + ${caseEnforcementData.totals.locationChecks} location checks + ${caseEnforcementData.totals.nsoVisits} NSO contacts.</div></div>
    `;
  }

  drawLineChart("ceh-trend", caseEnforcementData.monthlyTrend);
  drawDonutChart("ceh-mix", caseEnforcementData.eventMix);
  drawPulseChart("ceh-pulse", caseEnforcementData.monthlyTrend);
  drawHorizontalBars("ceh-hotspots", caseEnforcementData.hotspots, "#22c55e");
  drawHorizontalBars("ceh-case-link", caseEnforcementData.caseLinks, "#38bdf8");
  drawHorizontalBars("ceh-officers", caseEnforcementData.officerTouchpoints, "#f59e0b");

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
              <td>KPI Strip</td>
              <td>case_involve_dev_v1, incidents_dev_v1, arrests_dev_v1, sns_person_dev_v1, location_checks_dev_v1, nso_visits_dev_v1</td>
              <td>involve_id_pk, incident_id, arrest_id/incident_id, stop_search_person_id, lcheck_id_pk, visit_id_pk</td>
            </tr>
            <tr>
              <td>12-Month Enforcement Intensity</td>
              <td>incidents_dev_v1, arrests_dev_v1, sns_person_dev_v1, location_checks_dev_v1, nso_visits_dev_v1</td>
              <td>incident_date, arrest_date/incident_date, stopped_date, check_date, visit_date</td>
            </tr>
            <tr>
              <td>Event Type Mix</td>
              <td>case_involve_dev_v1, incidents_dev_v1, arrests_dev_v1, sns_person_dev_v1, location_checks_dev_v1, nso_visits_dev_v1</td>
              <td>involve_id_pk, incident_id, arrest_id/incident_id, stop_search_person_id, lcheck_id_pk, visit_id_pk</td>
            </tr>
            <tr>
              <td>Incident vs Arrest Pulse</td>
              <td>incidents_dev_v1, arrests_dev_v1</td>
              <td>incident_date, incident_id, crime_type (arrests uses incident-style mapping with type=arrest)</td>
            </tr>
            <tr>
              <td>Location Hotspots</td>
              <td>incidents_dev_v1, sns_person_dev_v1, nso_visits_dev_v1</td>
              <td>island_name, atoll_name</td>
            </tr>
            <tr>
              <td>Top Case Linkages</td>
              <td>case_involve_dev_v1, incidents_dev_v1, arrests_dev_v1</td>
              <td>case_id, incident_id, involve_id_pk</td>
            </tr>
            <tr>
              <td>Officer Touchpoints</td>
              <td>sns_person_dev_v1, location_checks_dev_v1, nso_visits_dev_v1</td>
              <td>officer_service_number, officer_full_name_eng</td>
            </tr>
            <tr>
              <td>All Enforcement Records Table</td>
              <td>all 5 indices above</td>
              <td>record id + date + event type + location + officer fields from each source</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  const recordsRoot = document.getElementById("ceh-records");
  if (recordsRoot) {
    recordsRoot.innerHTML = caseEnforcementData.records
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
