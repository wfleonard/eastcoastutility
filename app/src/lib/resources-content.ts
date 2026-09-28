/**
 * Resource page content. Types and publishing rules live in ./resources.ts.
 *
 * Public facts below were checked against the primary source on 2026-09-28
 * (rule text, agency page, or the railroad's own document) and each page lists
 * those sources. NJDEP rules were amended 2026-09-21: cite dep.nj.gov copies,
 * not Cornell LII, which still shows the old text and old section numbers.
 *
 * Every `tom` block is a slot for interview material. A page cannot be marked
 * published while any remain.
 */
import type { ResourcePage } from './resources'

const NJAC_16_41 = { label: 'N.J.A.C. 16:41-6.1, utility permit eligibility (Cornell LII)', url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-16-41-6-1' }
const NJAC_16_41_FEES = { label: 'N.J.A.C. 16:41-8.1, permit fees (Cornell LII)', url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-16-41-8-1' }
const NJDOT_HOP = { label: 'NJDOT Highway Occupancy Permits and e-Permitting', url: 'https://dot.nj.gov/transportation/business/Highwayoccupancypermits/' }
const NJDEP_7_7A = { label: 'N.J.A.C. 7:7A, Freshwater Wetlands Protection Act Rules (NJDEP, amended Sept. 21, 2026)', url: 'https://dep.nj.gov/wp-content/uploads/rules/rules/njac7_7a.pdf' }
const NJDEP_7_13 = { label: 'N.J.A.C. 7:13, Flood Hazard Area Control Act Rules (NJDEP, amended Sept. 21, 2026)', url: 'https://dep.nj.gov/wp-content/uploads/rules/rules/njac7_13.pdf' }
const NJDEP_7_7 = { label: 'N.J.A.C. 7:7, Coastal Zone Management Rules (NJDEP)', url: 'https://dep.nj.gov/wp-content/uploads/rules/rules/njac7_7.pdf' }
const NJDEP_UTIL = { label: 'NJDEP Land Resource Protection: utility lines', url: 'https://dep.nj.gov/wlm/lrp/common-projects/utility-lines/' }
const NJTA_LTC = { label: 'NJ Turnpike Authority: License to Cross', url: 'https://www.njta.gov/forms-records/license-to-cross/' }
const MONMOUTH_REGS = { label: 'Monmouth County road opening regulations', url: 'https://www.monmouthcountyparks.com/documents/28/regs_PDF.pdf' }
const NJ1CALL_RULES = { label: 'N.J.A.C. 14:2, One-Call Damage Prevention System (NJ One Call)', url: 'https://www.nj1-call.org/wp-content/uploads/2023/03/nj-administrative-code-one-call-rules2022.pdf' }
const NJ1CALL_FAQ = { label: 'NJ One Call FAQ', url: 'https://www.nj1-call.org/faq/' }
const NCDOT_2018 = { label: 'NCDOT bid tabulation, contract D5POC064, March 28, 2018', url: 'https://connect.ncdot.gov/letting/Division%205%20Letting/03-28-2018/D5POC064_Bid%20Tabs%20Report.pdf' }
const IOWA_TR570 = { label: 'Iowa Highway Research Board TR-570, Trenchless Technology practices (2010)', url: 'https://rosap.ntl.bts.gov/view/dot/60806/dot_60806_DS1.pdf' }

const MODIFIED = '2026-09-28'

export const PAGES: ResourcePage[] = [
    // ── A1 ────────────────────────────────────────────────────────────────
    {
        slug: 'njdot-utility-permit-timeline',
        question: 'How long does an NJDOT utility permit take to approve?',
        description:
            'NJDOT allows itself up to 45 days to find a utility opening application complete and 45 more to decide it, but real timelines depend on how clean the first submittal is.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'Under N.J.A.C. 16:41, NJDOT has up to 45 days to decide whether a utility opening application is complete, and then up to 45 more days to approve or deny it. On paper that is about three months at the outside. Every request for more information restarts the clock for that step, which is where most of the real delay comes from.',
        ],
        sections: [
            {
                heading: 'The published clock',
                blocks: [
                    { type: 'table', head: ['Step', 'Published limit'], rows: [
                        ['Completeness review', 'Up to 45 days from receipt'],
                        ['Decision once complete', 'Up to 45 days'],
                        ['Applicant response to a request for information', '90 days, or the application is treated as withdrawn'],
                        ['Permit term for a utility opening', '2 years'],
                    ] },
                    { type: 'p', text: 'The clock excludes time the application sits with the applicant, and FHWA review time on Interstates. NJDOT may also extend review for long longitudinal installations: private lines over 660 feet and fiber over 1,320 feet.' },
                ],
            },
            {
                heading: 'What actually happens',
                blocks: [
                    { type: 'tom', prompt: 'Real ranges in weeks from recent jobs: fastest, typical, slowest. What made the fast one fast and the slow one slow.' },
                    { type: 'tom', prompt: 'The most common reasons an application comes back incomplete.' },
                    { type: 'tom', prompt: 'Does the e-Permitting portal change turnaround compared with paper submittals?' },
                ],
            },
            {
                heading: 'Things that add time before you file',
                blocks: [
                    { type: 'ul', items: [
                        'Only the utility that will own the line can hold the permit. A contractor prepares the package; the utility signs it, or a representative signs with an MT-156 power of attorney.',
                        'A traffic control plan is required for all utility work in the state highway right-of-way.',
                        'Crossings directly under a state highway must be encased unless NJDOT approves a waiver (form MT-159). An uncased trenchless crossing needs a PE-certified technical memo.',
                        'Highways paved within the last five years are closed to openings without a Commissioner waiver.',
                    ] },
                    { type: 'tom', prompt: 'How much lead time should an engineer or GC budget for the permit, counting the utility’s own internal sign-off?' },
                ],
            },
        ],
        needsFromTom: [
            'Real approval ranges in weeks, fastest to slowest',
            'Most common reasons an application is sent back',
            'Recommended lead time to budget, including the utility’s own sign-off',
        ],
        sources: [NJAC_16_41, NJAC_16_41_FEES, NJDOT_HOP],
    },

    // ── A2 ────────────────────────────────────────────────────────────────
    {
        slug: 'njdot-road-opening-permit',
        question: 'NJDOT road opening permit for utility work: how does it work?',
        description:
            'Utility work on a New Jersey state highway needs a Highway Occupancy Permit for a utility opening (form MT-17A), held by the utility owner and designed to the Utility Accommodation rules.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'To open, cross or bore under a New Jersey state highway for utility work, you need an NJDOT Highway Occupancy Permit in the utility opening category, applied for on form MT-17A under N.J.A.C. 16:41. The design has to meet the Utility Accommodation rules in N.J.A.C. 16:25. Only the permanent owner of the utility can hold the permit, not the contractor doing the work.',
        ],
        sections: [
            {
                heading: 'Road opening permit vs. utility accommodation',
                blocks: [
                    { type: 'p', text: 'They are two different things that people often use interchangeably. N.J.A.C. 16:41 is the permit: it authorizes the work in the right-of-way. N.J.A.C. 16:25 is the rulebook for how a utility is allowed to sit in a state highway: depth, encasement, separation and detectability. A utility-initiated job goes through the permit. A relocation that NJDOT’s own highway project forces goes through a utility agreement instead.' },
                ],
            },
            {
                heading: 'Fees',
                blocks: [
                    { type: 'table', head: ['Opening size', 'Application', 'Permit', 'Extension'], rows: [
                        ['0–20 sq ft', '$525', '$200', '$200'],
                        ['20–200 sq ft', '$790', '$265', '$265'],
                        ['Over 200 sq ft', '$1,185', '$395', '$395'],
                    ] },
                    { type: 'p', text: 'Fees are nonrefundable. Lane or shoulder closings and test borings carry their own smaller fees. NJDOT may also require a bond or deposit to guarantee restoration; the rule sets no fixed amount, and utilities with many permits can post one blanket bond.' },
                ],
            },
            {
                heading: 'What the application needs',
                blocks: [
                    { type: 'ul', items: [
                        'Form MT-17A, signed by the utility (or by a representative with an MT-156 power of attorney)',
                        'Plans, a traffic control plan, and evidence of existing facilities above and below ground',
                        'Evidence of NJ One Call membership and of public-utility status from the BPU',
                        'Any approved waiver from the 16:25 design standards',
                    ] },
                    { type: 'p', text: 'Applications go to the NJDOT Operations Permit Office, now through the web-based e-Permitting system on the myNJ portal.' },
                ],
            },
            {
                heading: 'Design rules that shape an HDD crossing',
                blocks: [
                    { type: 'ul', items: [
                        'HDD is an accepted method for pipelines under a state highway; entry and exit pits must be beyond the paved area.',
                        'Crossings directly under the highway must be encased unless a waiver is approved.',
                        'Minimum cover is 36 inches for pipelines and for electric and communication lines. For trenchless installs depth is set case by case.',
                        'Open-cut transverse trenches are not allowed on freeways. Crossings must be trenchless from outside the no-access limits.',
                        'Non-metallic lines need trace wire, and as-builts on NJ State Plane coordinates are due within one month.',
                    ] },
                ],
            },
            {
                heading: 'Not every state-looking road is NJDOT',
                blocks: [
                    { type: 'p', text: 'The NJ Turnpike and Garden State Parkway belong to the NJ Turnpike Authority, which requires a License to Cross (minimum $6,000 application fee) instead of an NJDOT permit. County roads have their own permits: Monmouth County, for example, charges $250 for a commercial or utility road opening and requires a bond and insurance naming the County.' },
                ],
            },
            {
                heading: 'In practice',
                blocks: [
                    { type: 'tom', prompt: 'Who actually prepares the package on ECU jobs, and how the hand-off with the utility works.' },
                    { type: 'tom', prompt: 'Insurance and bonding amounts NJDOT has actually asked for on recent jobs.' },
                    { type: 'tom', prompt: 'When an uncased crossing waiver is worth pursuing, and how often it gets approved.' },
                ],
            },
        ],
        needsFromTom: [
            'Who prepares the package and how the utility hand-off works',
            'Real bond and insurance amounts',
            'Experience with encasement waivers',
        ],
        sources: [NJAC_16_41, NJAC_16_41_FEES, NJDOT_HOP, NJTA_LTC, MONMOUTH_REGS],
    },

    // ── A3 ────────────────────────────────────────────────────────────────
    {
        slug: 'permit-to-bore-under-municipal-road-nj',
        question: 'Do you need a permit to bore under a municipal road in NJ?',
        description:
            'Yes. New Jersey towns regulate street openings by ordinance, and most explicitly include boring under the road. Fees, deposits and paving moratoriums differ town to town.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'Yes. New Jersey law (N.J.S.A. 40:67-1) lets every municipality set the terms for digging in or under its streets, and town ordinances typically cover boring as well as open cuts. Ocean Township’s code, for example, requires a permit to “cut, dig, drill, bore under” any public way. Expect a fee, a cash deposit or bond, insurance naming the town, and a moratorium on recently paved streets.',
        ],
        sections: [
            {
                heading: 'What a typical ordinance requires',
                blocks: [
                    { type: 'p', text: 'Two Monmouth County examples show how much the details vary:' },
                    { type: 'table', head: ['', 'Ocean Township', 'Borough of Belmar'], rows: [
                        ['Permit from', 'Township Engineer', 'Borough Clerk'],
                        ['Fee', '$125–$275+ by opening size', 'Set by council resolution'],
                        ['Deposit / bond', '$500–$1,500 cash deposit; $5,000 blanket bond for BPU utilities', 'Per resolution'],
                        ['Insurance', '$300k / $1M bodily injury, $500k property, town as additional insured', 'Per ordinance'],
                        ['New-pavement moratorium', '5 years', '3 years'],
                        ['Permit validity', '90 days', '—'],
                    ] },
                    { type: 'p', text: 'There is no statewide number for any of these. Always read the current ordinance for the specific town, and check for recent amendments: both of these codes changed in the last two years.' },
                ],
            },
            {
                heading: 'Municipal vs. county vs. state road',
                blocks: [
                    { type: 'p', text: 'The permit follows the road owner, not the town the road runs through. A county road through a borough needs a county permit; a state highway needs an NJDOT permit. On a job that crosses more than one, you need each owner’s permit.' },
                ],
            },
            {
                heading: 'Towns with additional requirements',
                blocks: [
                    { type: 'tom', prompt: 'Towns that are straightforward and towns with extra requirements, by name (with sign-off on any town named).' },
                    { type: 'tom', prompt: 'What a municipal application asks for that a state one does not, and typical turnaround.' },
                ],
            },
        ],
        needsFromTom: [
            'Which towns are straightforward vs. have additional requirements (with sign-off)',
            'Typical municipal turnaround and what towns ask for that NJDOT does not',
        ],
        sources: [
            { label: 'N.J.S.A. 40:67-1 (Justia)', url: 'https://law.justia.com/codes/new-jersey/title-40/section-40-67-1/' },
            { label: 'Township of Ocean Code, Ch. 8 (eCode360)', url: 'https://ecode360.com/35338040' },
            { label: 'Borough of Belmar Code, Ch. 27 (eCode360)', url: 'https://ecode360.com/35397600' },
            MONMOUTH_REGS,
        ],
    },

    // ── A4 ────────────────────────────────────────────────────────────────
    {
        slug: 'njdep-wetlands-stream-encroachment-utility-crossing',
        question: 'NJDEP permits for utility crossings: wetlands, streams and flood hazard areas',
        description:
            'Under NJDEP rules amended in 2026, an HDD utility crossing under wetlands or a regulated stream generally needs a $1,000 general permit and an inadvertent-return contingency plan.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'Under NJDEP’s current rules, directional drilling under freshwater wetlands or a regulated stream usually needs a general permit: General Permit 2 under the Freshwater Wetlands rules and General Permit 12 under the Flood Hazard Area rules. Each costs $1,000 and requires a contingency plan for inadvertent returns (frac-outs). Only a qualifying jack-and-bore with no surface disturbance can skip approval.',
            'This changed recently. Older copies of the rules, including many still online, say HDD under wetlands needs no approval. The NJDEP text amended September 21, 2026 no longer says that.',
        ],
        sections: [
            {
                heading: 'Which permit, and when',
                blocks: [
                    { type: 'table', head: ['Situation', 'Rule', 'What applies'], rows: [
                        ['HDD under freshwater wetlands or transition areas', 'N.J.A.C. 7:7A-7.2 (GP 2)', 'General permit; show no adverse impact or discharge'],
                        ['Jack-and-bore under wetlands, no surface disturbance', 'N.J.A.C. 7:7A-7.2(b)', 'No approval required'],
                        ['HDD under a regulated water / flood hazard area', 'N.J.A.C. 7:13-9.12 (GP 12)', 'General permit'],
                        ['Qualifying jack-and-bore under a regulated water', 'N.J.A.C. 7:13-2.5', 'Exempt; HDD is expressly not exempt'],
                        ['Coastal zone, tidal waters', 'N.J.A.C. 7:7', 'Coastal permit covers flood hazard too; directional drilling required under submerged areas unless not feasible'],
                    ] },
                ],
            },
            {
                heading: 'Conditions on an HDD general permit',
                blocks: [
                    { type: 'ul', items: [
                        'Drill with potable water and NSF 60/61-certified drilling fluids.',
                        'Submit a contingency plan for inadvertent returns.',
                        'Under a stream channel, keep the top of the line at least 4 feet below the channel bottom and level for 10 feet beyond each top of bank.',
                        'No tree clearing in the riparian zone, and pits outside the floodway and riparian zone.',
                        'Grout abandoned boreholes and the top 5 feet of entry and exit points.',
                        'Wetlands mitigation is required for permanent disturbance of 0.1 acre or more.',
                    ] },
                ],
            },
            {
                heading: 'Timeline',
                blocks: [
                    { type: 'p', text: 'NJDEP has 20 working days to find an application complete and 90 calendar days after that to decide, with one optional 30-day extension. The two rules differ on a missed deadline: a flood hazard application is deemed approved, but a wetlands application is not.' },
                    { type: 'tom', prompt: 'Real NJDEP timelines on recent crossings, and the lead time GCs never budget.' },
                    { type: 'tom', prompt: 'The threshold question: common crossings where NJDEP is not triggered at all.' },
                    { type: 'tom', prompt: 'A frac-out or near-miss and how the contingency plan played out (if he will share one).' },
                ],
            },
        ],
        needsFromTom: [
            'Real NJDEP timelines and recommended lead time',
            'Common crossings where NJDEP is not triggered',
            'A contingency-plan story from the field',
        ],
        sources: [NJDEP_7_7A, NJDEP_7_13, NJDEP_7_7, NJDEP_UTIL, { label: 'NJDEP Resilient Environments and Landscapes (REAL) rules', url: 'https://dep.nj.gov/njreal/' }],
    },

    // ── A5 ────────────────────────────────────────────────────────────────
    {
        slug: 'nj-railroad-turnpike-utility-crossing-permits',
        question: 'Railroad and toll road utility crossings in New Jersey: who approves what?',
        description:
            'Each New Jersey railroad and toll authority runs its own crossing process, with its own fees, insurance and depth rules. HDD under track is often treated as a variance.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'There is no single permit. Each railroad (NJ TRANSIT, Amtrak, Conrail, CSX and Norfolk Southern) and each toll road authority has its own application, fees, insurance requirement and engineering spec. Review fees alone run from $750 to over $5,000 per crossing, and railroad protective liability insurance and flagging are extra. Several railroads treat HDD under track as a special case.',
        ],
        sections: [
            {
                heading: 'Railroad crossings at a glance',
                blocks: [
                    { type: 'table', head: ['Owner', 'Apply through', 'Review / application fee', 'Notes'], rows: [
                        ['NJ TRANSIT', 'Real Estate, Use and Occupancy Permits', '$750 pipe crossing (N.J.A.C. 16:77)', 'Annual permit fee from $317'],
                        ['Amtrak', 'Amtrak third-party property portal', '$3,000 pipeline crossing review', 'Permit to Enter $2,000; approval “may take a few months”'],
                        ['Conrail', 'Application for Pipe or Wire Occupations', '$750 application + $750 document + $1,500 engineering', '$2,500 RPL insurance fee'],
                        ['CSX', 'CSX Property Portal', '$3,315 standard, $5,575 variance', 'HDD is always a variance'],
                        ['Norfolk Southern', 'RailPros portal', '$2,500 pipeline crossing', '$1,900 RPL risk fee option'],
                    ] },
                ],
            },
            {
                heading: 'Depth under track',
                blocks: [
                    { type: 'p', text: 'Conrail and Norfolk Southern both require casing and carrier pipes at least 5½ feet below base of rail, and uncased gas lines at least 10 feet. They differ on when HDD is even considered: Norfolk Southern at more than 10 feet of cover, Conrail at more than 15 feet for pipe 6 inches and under or 25 feet for larger pipe. CSX treats every HDD as a variance with its own interim guidelines.' },
                ],
            },
            {
                heading: 'Toll roads',
                blocks: [
                    { type: 'p', text: 'Crossing the NJ Turnpike or Garden State Parkway requires a License to Cross from the NJ Turnpike Authority, with a minimum $6,000 nonrefundable application fee, plus a separate traffic permit for work affecting lanes. The Atlantic City Expressway is handled by the South Jersey Transportation Authority.' },
                ],
            },
            {
                heading: 'Flagging: the number that surprises people',
                blocks: [
                    { type: 'p', text: 'Published flagging rates are $1,500 a day at Amtrak and $2,100 a day at CSX, and a flagger is typically required for the whole time a crew is on railroad property.' },
                    { type: 'tom', prompt: 'Real flagging costs on a recent crossing, who paid, and how many days it ran.' },
                    { type: 'tom', prompt: 'Realistic lead time per railroad and for NJTA, and insurance limits actually required.' },
                ],
            },
        ],
        needsFromTom: [
            'Real flagging cost and duration from a job',
            'Realistic lead times per railroad / NJTA',
            'Insurance limits actually required',
        ],
        sources: [
            { label: 'NJ TRANSIT permitting', url: 'https://www.njtransit.com/permitting' },
            { label: 'N.J.A.C. 16:77-1.4, NJ TRANSIT utility fees (Cornell LII)', url: 'https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-16-77-1-4' },
            { label: 'Amtrak utility installations', url: 'https://www.amtrak.com/utility-installations' },
            { label: 'Amtrak permit process', url: 'https://www.amtrak.com/permit-process' },
            { label: 'Conrail instructions for occupations', url: 'https://conrail.com/wp-content/uploads/2022/02/Instructions-for-Occupations-on-Conrail-Property.pdf' },
            { label: 'Conrail CE-8 pipeline specifications', url: 'https://conrail.com/wp-content/uploads/2022/02/Conrail-CE-8-2021.pdf' },
            { label: 'CSX permitting information packet', url: 'https://www.csx.com/share/wwwcsx15/assets/File/Customers/Property/permit-information-packet.pdf' },
            { label: 'Norfolk Southern pipe and wire', url: 'https://www.norfolksouthern.com/en/rail-development-property/ns-property/projects-on-ns-property/pipe-and-wire' },
            { label: 'Norfolk Southern NSCE-8 pipeline specifications', url: 'https://www.norfolksouthern.com/content/dam/nscorp/pdf/public-projects/Specs-pipeline-occupancy-NSCE-8%20-1.24.24.pdf' },
            NJTA_LTC,
        ],
    },

    // ── A6 ────────────────────────────────────────────────────────────────
    {
        slug: 'nj-one-call-markout-requirements',
        question: 'NJ One Call markout requirements before drilling',
        description:
            'In New Jersey you must call 811 at least 3 and no more than 10 business days before drilling; the ticket lasts 45 business days and the hand-dig zone is 2 feet.',
        group: 'Permits',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'Before any drilling or boring in New Jersey, call 811 (NJ One Call) at least 3 and no more than 10 business days before you start. Utilities have 3 business days to mark or report no facilities. The ticket stays valid for 45 business days if you keep the marks up, and no mechanized equipment may work within 2 feet of a marked line until it has been exposed by hand.',
        ],
        sections: [
            {
                heading: 'The rules in one table',
                blocks: [
                    { type: 'table', head: ['Rule', 'New Jersey requirement'], rows: [
                        ['Notice', '3 to 10 business days before excavation'],
                        ['Operator response', 'Mark or report “no facilities” within 3 business days'],
                        ['Ticket life', '45 business days, if work starts within 10 and marks are maintained'],
                        ['Hand-dig zone', '2 feet horizontally from the outside of a marked facility'],
                        ['Area marked', 'Inside your white-lined area plus facilities within 10 feet of it'],
                        ['Penalty', '$1,000–$2,500 per day per violation, up to $25,000'],
                    ] },
                    { type: 'p', text: 'New Jersey’s 2-foot hand-dig zone is different from the national APWA default of facility width plus 18 inches each side, so out-of-state crews should not assume the rule they know.' },
                ],
            },
            {
                heading: 'Marking colors in New Jersey',
                blocks: [
                    { type: 'table', head: ['Color', 'Facility'], rows: [
                        ['Red', 'Electric'],
                        ['Yellow', 'Gas, oil, steam, petroleum, hazardous liquids'],
                        ['Orange', 'Telephone, fiber, cable TV, communications'],
                        ['Blue', 'Water, slurry'],
                        ['Green', 'Sewer'],
                        ['White', 'Proposed excavation'],
                    ] },
                ],
            },
            {
                heading: 'Drilling is excavation',
                blocks: [
                    { type: 'p', text: 'New Jersey’s definition of excavation expressly includes drilling, boring and tunneling. The One Call rules have no separate HDD section, so the general rules apply to the full bore path, and on a state highway the One Call confirmation number must reach NJDOT at least 72 hours before work begins.' },
                    { type: 'tom', prompt: 'How ECU verifies crossings along a bore path before drilling (potholing practice).' },
                ],
            },
            {
                heading: 'When a markout is wrong or missing',
                blocks: [
                    { type: 'p', text: 'Call NJ One Call with the original ticket number, name the utility that did not mark, and request an update ticket. Under the rules, an operator that fails to mark is liable for the excavator’s resulting costs and downtime. If you hit a gas or hazardous-liquid line, call 911 first, then the operator.' },
                    { type: 'tom', prompt: 'A real story of a markout being wrong or a utility not showing, and what happened next.' },
                    { type: 'tom', prompt: 'What an incomplete markout looks like in the field.' },
                ],
            },
        ],
        needsFromTom: [
            'Potholing practice along a bore path',
            'A real wrong-markout story',
            'What an incomplete markout looks like',
        ],
        sources: [NJ1CALL_RULES, NJ1CALL_FAQ, { label: 'APWA uniform color code and marking guidelines', url: 'https://www.apwa.org/wp-content/uploads/APWA-Guide_UniformTempMarkingsNEW-V1-02-25-22.pdf' }],
    },

    // ── B1 ────────────────────────────────────────────────────────────────
    {
        slug: 'directional-boring-cost-per-foot-new-jersey',
        question: 'How much does directional boring cost per foot in New Jersey?',
        description:
            'Directional boring in New Jersey is priced per foot plus mobilization, and the range is driven by diameter, length, soil and rock, and permitting more than by the footage itself.',
        group: 'Cost',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            // The NJ range must come from Tom. Public figures below are out-of-state and dated.
            'Directional boring is priced per linear foot plus mobilization, and in New Jersey the per-foot number moves most with pipe diameter, bore length, ground conditions and the permits involved.',
        ],
        sections: [
            {
                heading: 'New Jersey price ranges',
                blocks: [
                    { type: 'tom', prompt: 'Per-foot ranges for common jobs (small conduit, 4–8 in. water/gas, larger), and when mobilization is charged separately.' },
                ],
            },
            {
                heading: 'What moves the price, ranked',
                blocks: [
                    { type: 'tom', prompt: 'The cost drivers ranked from biggest to smallest, including the rock multiplier.' },
                    { type: 'tom', prompt: 'What customers most often underestimate.' },
                ],
            },
            {
                heading: 'Public bid data for comparison',
                blocks: [
                    { type: 'p', text: 'State DOT bid results give a floor for simple conduit work, but they are out of state and several years old. A 2018 North Carolina DOT conduit contract received directional drilling bids of $27.70 and $33.00 per foot for 1- to 3-inch conduit across 8,200 feet. New Jersey jobs with permits, traffic control and restoration will typically price above public figures like these.' },
                ],
            },
        ],
        needsFromTom: [
            'NJ per-foot ranges by job type, and mobilization',
            'Cost drivers ranked, with the rock multiplier',
            'What customers underestimate',
        ],
        sources: [NCDOT_2018],
    },

    // ── B2 ────────────────────────────────────────────────────────────────
    {
        slug: 'hdd-vs-open-cut-cost-comparison',
        question: 'HDD vs. open-cut trenching: when is each actually cheaper?',
        description:
            'Open-cut trenching is often cheaper per foot in open, unpaved ground. HDD usually wins once pavement restoration, traffic control, depth or an obstacle enters the job.',
        group: 'Cost',
        status: 'draft',
        dateModified: MODIFIED,
        answer: [
            'In open, unpaved ground with nothing to cross, trenching is often the cheaper choice: on one public DOT contract, trenching bid at $12–$13 a foot against $27.70–$33 for directional drilling of the same conduit. HDD usually wins once the line has to go under pavement, a road, a railroad, a stream or anything that must stay in service, because restoration and disruption costs grow faster than drilling costs.',
        ],
        sections: [
            {
                heading: 'Why the answer flips',
                blocks: [
                    { type: 'p', text: 'The direct cost of digging is only part of an open-cut job. A 2010 Iowa DOT research report on trenchless methods cites estimates that up to 70% of the total cost of an underground utility project can be backfill, compaction and replacing pavement and landscaping. HDD also costs little more as depth increases, while a trench gets wider, needs shoring and costs more with every foot of depth.' },
                    { type: 'p', text: 'The same report is candid about HDD’s risks: settlement, heave and drilling-fluid returns, and a failed trenchless job can cost considerably more than a trench would have.' },
                ],
            },
            {
                heading: 'The crossover in practice',
                blocks: [
                    { type: 'tom', prompt: 'The honest crossover: at what distance, depth and surface type does trenching win?' },
                    { type: 'tom', prompt: 'When he tells a customer to just dig it.' },
                ],
            },
        ],
        needsFromTom: [
            'Honest crossover by distance, depth and surface',
            'When he tells customers to trench instead',
        ],
        sources: [NCDOT_2018, IOWA_TR570],
    },
]
