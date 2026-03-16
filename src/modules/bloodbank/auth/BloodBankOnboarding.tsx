import { useNavigate } from "react-router-dom"
import logoWhite from '../../../assets/images/logo.png'
import {
  Download,
  FileText,
  User,
  Building2,
  Phone,
  Mail,
  Bell,
  BadgeCheck,
  CircleQuestionMark,
} from "lucide-react"

/* ====  TYPES ==== */

type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-"

interface OnboardingData {
  verificationId: string
  basicInfo: {
    name: string
    license: string
    address: string
  }
  contact: {
    name: string
    role: string
    email: string
    phone: string
  }
  documents: {
    license: { name: string; size: string; title: string }
    id: { name: string; size: string; title: string }
  }
  inventory: Record<BloodType, number>
}

/* ==== MOCK DATA ==== */

const data: OnboardingData = {
  verificationId: "BB-NGA-2024-0815",
  basicInfo: {
    name: "Lagos Blood Bank",
    license: "LRB-2022-5891",
    address: "45B Medical Road, Ikeja, Lagos, Nigeria",
  },
  contact: {
    name: "Dr. Chidinma Okoro",
    role: "Chief Medical Officer",
    email: "c.okoro@lbb.ng",
    phone: "+234 801 234 5678",
  },
  documents: {
    license: {
      title: "Official Operating License",
      name: "operating_license_2024.pdf",
      size: "1.2 MB",
    },
    id: {
      title: "Primary Contact's Government ID",
      name: "contact_person_nin.jpg",
      size: "3.4 MB",
    },
  },
  inventory: {
    "A+": 15,
    "A-": 8,
    "B+": 12,
    "B-": 5,
    "O+": 25,
    "O-": 10,
    "AB+": 6,
    "AB-": 2,
  },
}

/* ==== PAGE ==== */

export default function BloodBankOnboarding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= TOP HEADER ================= */}
      <header className="sticky top-0 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoWhite} alt="BloodDeck logo" className="h-10 w-auto" />
          </div>

          {/* ==== Right actions ==== */}
          <div className="flex items-center gap-6 text-sm text-gray-600" >
            <button className="hover:text-gray-900">Log in</button>
            <button className="hover:text-gray-900 font-bold">Register</button>

            <button className="relative">
              <Bell size={18} />
            </button>

            <button className="relative">
              <CircleQuestionMark size={18} />
            </button>

            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Blood Bank Onboarding
          </h1>
          <p className="text-sm text-gray-500">
            Complete the steps below to get your facility verified and listed on
            our platform.
          </p>
        </div>

        {/* Status banner */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="flex items-start gap-3">
              <BadgeCheck className="shrink-0 mt-1 sm:mt-0 sm:self-center text-gray-600" size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-900">
                Verification Successful
              </p>
              <p className="text-sm text-gray-500">
                Your Blood Bank is now verified and listed. Your Blood Bank ID is{" "}
                <span className="font-bold">{data.verificationId}</span>.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto rounded-md bg-gray-300 px-4 py-2 text-sm text-gray hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">
            Onboarding Complete
          </p>
          <div className="h-1 rounded bg-gray-200">
            <div className="h-1 w-full rounded bg-gray-900" />
          </div>
        </div>

        {/* Section 1 */}
        <Section title="1. Basic Information">
          <Grid>
            <Field label="Blood Bank Name" value={data.basicInfo.name} />
            <Field
              label="Registration / License Number"
              value={data.basicInfo.license}
            />
            <Field
              label="Official Address"
              value={data.basicInfo.address}
              full
            />
          </Grid>
        </Section>

        {/* Section 2 */}
        <Section title="2. Contact Person">
          <Grid>
            <Field
              label="Full Name"
              value={data.contact.name}
              icon={<User size={14} />}
            />
            <Field
              label="Role / Position"
              value={data.contact.role}
              icon={<Building2 size={14} />}
            />
            <Field
              label="Contact Email"
              value={data.contact.email}
              icon={<Mail size={14} />}
            />
            <Field
              label="Contact Phone Number"
              value={data.contact.phone}
              icon={<Phone size={14} />}
            />
          </Grid>
        </Section>

        {/* Section 3 */}
        <Section title="3. Verification Documents">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                heading: data.documents.license.title,
                doc: data.documents.license,
              },
              {
                heading: data.documents.id.title,
                doc: data.documents.id,
              },
            ].map(({ heading, doc }) => (
              <div key={heading} className="space-y-2">
                {/* heading sits just outside the bordered card */}
                <p className="text-xs font-medium text-gray-900">{heading}</p>
                <div className="rounded-md border border-gray-200 bg-gray-200">
                  <FileCard {...doc} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4 */}
        <Section title="4. Initial Inventory Setup">
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {Object.entries(data.inventory).map(([type, value]) => (
              <div key={type} className="space-y-1">
                <p className="text-xs font-medium text-gray-700">{type}</p>
                <div className="rounded-md border border-gray-200 bg-gray-50 py-3 text-center text-sm">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  )
}

/* ==== INTERNAL HELPERS  ==== */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <div className="h-px bg-gray-200" />
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>
}

function Field({
  label,
  value,
  full,
  icon,
}: {
  label: string
  value: string
  full?: boolean
  icon?: React.ReactNode
}) {
  return (
    <div className={full ? "md:col-span-2 space-y-1" : "space-y-1"}>
      <label className="text-xs text-gray-600">{label}</label>
      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span>{value}</span>
      </div>
    </div>
  )
}

function FileCard({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 p-3">
      <div className="flex items-center gap-3">
        <div className="flex w-10 h-10 items-center justify-center rounded-md bg-gray-300">
          <FileText className="text-gray-400" size={18} />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{size}</p>
        </div>
      </div>
      <button className="text-gray-600 hover:text-gray-900">
        <Download size={16} />
      </button>
    </div>
  )
}
