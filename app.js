const tabs = [
  {
    id: "profile-summary",
    label: "Profile Summary",
    content: `
      <h2>Profile Summary</h2>
      <p class="placeholder">Overview cards, identity details, risk indicators, and top-level profile insights from <code>profile_dev_v1</code> will render here.</p>
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
};

function bindProfile(profile) {
  document.getElementById("full-name-eng").textContent = profile.full_name_eng || "-";
  document.getElementById("full-name-dhi").textContent = profile.full_name_dhi || "-";
  document.getElementById("person-id").textContent = profile.person_id || "-";
  document.getElementById("id-card").textContent = profile.id_card_number || "-";
  document.getElementById("passport").textContent = profile.passport_number || "-";
  document.getElementById("profile-photo").src = profile.latest_photo || "https://via.placeholder.com/260x260?text=No+Image";
  document.getElementById("risk-score").textContent = profile.risk_score ?? "-";
  document.getElementById("risk-band").textContent = profile.risk_score_band || "-";
  document.getElementById("offender-category").textContent = profile.offender_category || "-";
  document.getElementById("gang-affiliated").textContent = profile.is_gang_affiliated || "-";
}

function renderTabs() {
  const tabsRoot = document.getElementById("tabs");
  const contentRoot = document.getElementById("tab-content");

  tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    button.className = `tab-btn ${index === 0 ? "active" : ""}`;
    button.textContent = tab.label;
    button.dataset.tabId = tab.id;

    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      contentRoot.innerHTML = tab.content;
    });

    tabsRoot.appendChild(button);
  });

  contentRoot.innerHTML = tabs[0].content;
}

bindProfile(sampleProfile);
renderTabs();
