 export type NavLink  = { label: string; href: string }
export type MegaCol  = { heading: string; links: NavLink[] }
export type NavItem  = { label: string; href?: string; dropdown?: NavLink[]; mega?: MegaCol[] }

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'New Connections',
    mega: [
      {
        heading: 'Domestic & Commercial',
        links: [
          { label: 'New Domestic Connection',  href: '/services/new-domestic-connection' },
          { label: 'Commercial Connection',     href: '/services/commercial-connection' },
          { label: 'Temporary Connection',      href: '/services/temporary-connection' },
          { label: 'Connection on Lease',       href: '/services/connection-on-lease' },
          { label: 'Connection Transfer',       href: '/services/connection-transfer' },
          { label: 'Meter Replacement',         href: '/services/meter-replacement' },
        ],
      },
      {
        heading: 'Industrial & HT / LT',
        links: [
          { label: 'HT Industrial Connection',  href: '/services/ht-industrial-connection' },
          { label: 'LT Industrial Connection',  href: '/services/lt-industrial-connection' },
          { label: 'Load Enhancement',          href: '/services/load-enhancement' },
          { label: 'Load Reduction',            href: '/services/load-reduction' },
          { label: 'Bulk Supply Connection',    href: '/services/bulk-supply-connection' },
          { label: 'EV Charging Station',       href: '/services/ev-charging-station' },
        ],
      },
      {
        heading: 'Other Services',
        links: [
          { label: 'Meter Shifting',            href: '/services/meter-shifting' },
          { label: 'Underground Cabling',       href: '/services/underground-cabling' },
          { label: 'Service Line Extension',    href: '/services/service-line-extension' },
          { label: 'Street Light Connection',   href: '/services/street-light-connection' },
          { label: 'Agriculture Connection',    href: '/services/agriculture-connection' },
          { label: 'Name Change in Meter',      href: '/services/name-change-meter' },
        ],
      },
    ],
  },
  {
    label: 'Solar & Green',
    mega: [
      {
        heading: 'Solar Installation',
        links: [
          { label: 'Rooftop Solar Residential', href: '/services/rooftop-solar-residential' },
          { label: 'Rooftop Solar Commercial',  href: '/services/rooftop-solar-commercial' },
          { label: 'Ground Mounted Solar',      href: '/services/ground-mounted-solar' },
          { label: 'Solar Water Heater',        href: '/services/solar-water-heater' },
          { label: 'Solar Street Light',        href: '/services/solar-street-light' },
        ],
      },
      {
        heading: 'Net Metering & Subsidy',
        links: [
          { label: 'Net Metering Registration', href: '/services/net-metering' },
          { label: 'DISCOM Approval',           href: '/services/discom-approval' },
          { label: 'PM Surya Ghar Subsidy',     href: '/services/pm-surya-ghar-subsidy' },
          { label: 'MNRE Registration',         href: '/services/mnre-registration' },
          { label: 'Solar REC Registration',    href: '/services/solar-rec' },
        ],
      },
      {
        heading: 'Storage & EV',
        links: [
          { label: 'Battery Storage System',    href: '/services/battery-storage' },
          { label: 'Hybrid Solar System',       href: '/services/hybrid-solar' },
          { label: 'EV Charging Setup',         href: '/services/ev-charging-setup' },
          { label: 'Wind-Solar Hybrid',         href: '/services/wind-solar-hybrid' },
        ],
      },
    ],
  },
  {
    label: 'Industrial',
    mega: [
      {
        heading: 'Power Setup',
        links: [
          { label: 'Factory Power Setup',              href: '/services/factory-power-setup' },
          { label: 'DG Set Installation',              href: '/services/dg-set-installation' },
          { label: 'Transformer Installation',         href: '/services/transformer-installation' },
          { label: 'Substation Setup',                 href: '/services/substation-setup' },
          { label: 'Capacitor Bank Setup',             href: '/services/capacitor-bank' },
        ],
      },
      {
        heading: 'Audit & Compliance',
        links: [
          { label: 'Energy Audit',                     href: '/services/energy-audit' },
          { label: 'Electrical Safety Audit',          href: '/services/electrical-safety-audit' },
          { label: 'Power Factor Correction',          href: '/services/power-factor-correction' },
          { label: 'Tariff Reclassification',          href: '/services/tariff-reclassification' },
          { label: 'Annual Return Filing',             href: '/services/annual-return-filing' },
        ],
      },
      {
        heading: 'Licenses & NOC',
        links: [
          { label: 'Electrical Contractor License',    href: '/services/electrical-contractor-license' },
          { label: 'Wireman License',                  href: '/services/wireman-license' },
          { label: 'Electrical Inspector NOC',         href: '/services/electrical-inspector-noc' },
          { label: 'CEA Compliance',                   href: '/services/cea-compliance' },
          { label: 'Safety Certificate',               href: '/services/safety-certificate' },
        ],
      },
    ],
  },
  {
    label: 'Billing & NOC',
    dropdown: [
      { label: 'Electricity Bill Dispute',   href: '/services/electricity-bill-dispute' },
      { label: 'Bill Correction Request',    href: '/services/bill-correction' },
      { label: 'Arrear Settlement',          href: '/services/arrear-settlement' },
      { label: 'Connection Restoration',     href: '/services/connection-restoration' },
      { label: 'Security Deposit Refund',    href: '/services/security-deposit-refund' },
      { label: 'NOC from DISCOM',            href: '/services/noc-from-discom' },
      { label: 'Tariff Category Change',     href: '/services/tariff-category-change' },
      { label: 'Disconnection Appeal',       href: '/services/disconnection-appeal' },
    ],
  },
  {
    label: 'Maintenance',
    dropdown: [
      { label: 'Electrical Maintenance AMC', href: '/services/electrical-amc' },
      { label: 'Transformer Maintenance',    href: '/services/transformer-maintenance' },
      { label: 'DG Set Service',             href: '/services/dg-set-service' },
      { label: 'Solar Panel Cleaning',       href: '/services/solar-panel-cleaning' },
      { label: 'Wiring & Rewiring',          href: '/services/wiring-rewiring' },
      { label: 'Switchgear Maintenance',     href: '/services/switchgear-maintenance' },
      { label: 'UPS & Inverter Service',     href: '/services/ups-inverter-service' },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

export const FOOTER_COLS = [
  {
    title: 'New Connections',
    links: [
      { label: 'New Domestic Connection',  href: '/services/new-domestic-connection' },
      { label: 'Commercial Connection',    href: '/services/commercial-connection' },
      { label: 'HT Industrial Connection', href: '/services/ht-industrial-connection' },
      { label: 'Load Enhancement',         href: '/services/load-enhancement' },
      { label: 'Connection Transfer',      href: '/services/connection-transfer' },
      { label: 'Meter Replacement',        href: '/services/meter-replacement' },
      { label: 'EV Charging Station',      href: '/services/ev-charging-station' },
    ],
  },
  {
    title: 'Solar & Green',
    links: [
      { label: 'Rooftop Solar Residential', href: '/services/rooftop-solar-residential' },
      { label: 'Rooftop Solar Commercial',  href: '/services/rooftop-solar-commercial' },
      { label: 'Net Metering Registration', href: '/services/net-metering' },
      { label: 'PM Surya Ghar Subsidy',     href: '/services/pm-surya-ghar-subsidy' },
      { label: 'DISCOM Approval',           href: '/services/discom-approval' },
      { label: 'Battery Storage System',    href: '/services/battery-storage' },
      { label: 'EV Charging Setup',         href: '/services/ev-charging-setup' },
    ],
  },
  {
    title: 'Billing & Compliance',
    links: [
      { label: 'Electricity Bill Dispute',  href: '/services/electricity-bill-dispute' },
      { label: 'Tariff Reclassification',   href: '/services/tariff-reclassification' },
      { label: 'NOC from DISCOM',           href: '/services/noc-from-discom' },
      { label: 'Connection Restoration',    href: '/services/connection-restoration' },
      { label: 'Arrear Settlement',         href: '/services/arrear-settlement' },
      { label: 'Annual Return Filing',      href: '/services/annual-return-filing' },
      { label: 'Electrical Inspector NOC',  href: '/services/electrical-inspector-noc' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',        href: '/about' },
      { label: 'Our Team',        href: '/team' },
      { label: 'Blog',            href: '/blog' },
      { label: 'Reviews',         href: '/reviews' },
      { label: 'Careers',         href: '/careers' },
      { label: 'Contact Us',      href: '/contact' },
      { label: 'Company Profile', href: '/company-profile' },
    ],
  },
]