import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string, // el ? significa si es opcional 
    amount: number
}

export default function AmountDisplay({label, amount} : AmountDisplayProps) {
    return (
        <p className="text-2xl text-green-600 font-bold">
            {label && `${label}: `}
            <span className="font-black text-gray-700">
                {formatCurrency( amount )}
            </span>
        </p>
    )
}
