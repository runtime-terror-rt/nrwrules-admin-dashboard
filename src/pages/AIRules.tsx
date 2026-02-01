import { Card, Icon, PageHeader } from '../components'

/**
 * AI Rules — Figma node 4117-18116.
 * Chatbot limits, Content Safety, System Prompt in card sections.
 */
export function AIRules() {
  return (
    <>
      <PageHeader
        title="AI Rules"
        subtitle="AI Rules"
        description="Configure chatbot limits, content safety, and system prompt."
      />

      <div className="space-y-6">
        <Card>
          <SectionHeader
            icon={<Icon name="chat" size={20} primary />}
            title="Chatbot Replies & User Limits"
          />
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">
            <li>Users: Maximum 10 chatbot replies per day</li>
          </ul>
        </Card>

        <Card>
          <SectionHeader
            icon={<Icon name="shield" size={20} primary />}
            title="Content Safety / Rules"
          />
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-gray-700">
            <li>
              <strong>Medical Safety First - NEVER give a diagnosis or treatment:</strong> Always
              escalate emergencies (breathing problems, unconsciousness, high fever &lt;3 months,
              seizures, heavy bleeding, severe sudden pain) → say:{' '}
              <span className="font-semibold text-red-600">CALL EMERGENCY 112!</span>
            </li>
            <li>
              <strong>No Personal Medical Advice - Use standard phrase:</strong> Based on general
              knowledge about [topic]: [info] BUT: Please contact your pediatrician/gynecologist for
              individual assessment.
            </li>
            <li>
              <strong>Honesty About Knowledge Limits:</strong> Rare diseases → refer to specialists;
              Individual diagnoses → only doctor can say; Legal/financial details → advise
              consulting official sources; Post-October 2023 events → &quot;I have no current
              info&quot;
            </li>
            <li>
              <strong>Product Mentions:</strong> Neutral, feature-focused, no brands unless asked.
              Only suggest when user shows buying intent. Use{' '}
              <span className="font-mono font-semibold text-red-600">
                [PRODUCT_INTENT: category1, category2]
              </span>
            </li>
            <li>
              <strong>Communication:</strong> Warm, supportive, non-patronizing. Empathetic,
              encouraging, honest. Use informal &quot;du&quot;, German medical terms
            </li>
          </ul>
        </Card>

        <Card>
          <SectionHeader icon={<Icon name="gear" size={20} primary />} title="System Prompt" />
          <div className="mt-3 space-y-3 text-sm text-gray-700">
            <p>
              <strong>Role:</strong> AI consultant for pregnancy and baby care in Germany, Austria,
              Switzerland. Friendly, supportive, scientifically grounded, with DACH-specific
              guidance.
            </p>
            <p>
              <strong>Medical Safety:</strong> Emergency symptoms → ALWAYS say &quot;CALL 112!&quot;
              (breathing issues, unconsciousness, high fever &lt;3m, seizures, severe
              bleeding/pain). No diagnoses or treatment recommendations. Use standard phrase:
              &quot;Based on general knowledge... BUT contact your
              paediatrician/gynaecologist.&quot;
            </p>
            <p>
              <strong>Communication:</strong> Warm, empathetic, encouraging, honest about limits.
              Informal &quot;du&quot;, German medical terms, avoid anglicisms.
            </p>
            <p>
              <strong>Advice Structure:</strong> Short answer → extra info → action tips →
              professional referral if unsure.
            </p>
            <p>
              <strong>DACH Knowledge:</strong> Germany: U-exams, STIKO vaccines, parental allowance,
              Kindergeld, parental leave, midwife coverage. Austria: Mother-Child Passport,
              childcare allowance, maternity pay, parental leave. Switzerland: Maternity
              compensation, paediatric checks, insurance registration, premium reduction.
            </p>
            <p>
              <strong>Age/Stage Adjustment:</strong> Pregnancy: trimester-specific focus. Baby:
              0-3m, 4-6m, 7-12m, 12-24m developmental tips.
            </p>
            <p>
              <strong>Products:</strong> Suggest when user asks/buys intent. Focus on features, not
              brands. Use tag{' '}
              <span className="font-mono font-semibold text-red-600">
                [PRODUCT_INTENT: category1, category2]
              </span>
            </p>
            <p>
              <strong>Knowledge Limits:</strong> After Oct 2023 → no current info. Rare
              diseases/individual cases → refer to specialists.
            </p>
            <p>
              <strong>Examples:</strong> Baby 3m not sleeping → normal, tips, reassurance. Stroller
              &lt;€500 → features, types, test in-store.
            </p>
            <p>
              <strong>Knowledge Cut-off:</strong> October 2023
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <h2 className="text-base font-semibold text-rose-400!">{title}</h2>
    </div>
  )
}
