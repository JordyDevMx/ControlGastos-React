import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // npm i react-circular-progressbar
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers"
import Swal from 'sweetalert2'
import AmountDisplay from "./AmountDisplay";
import withReactContent from 'sweetalert2-react-content'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    const limitBudget = (base: number, percentage: number) : number => {
        return (base * percentage) / 100;
    }

    const MySwal = withReactContent(Swal)

    if(remainingBudget === 0) {
        MySwal.fire({
            title: "No cuentas con presupuesto",
            text:`Disponibilidad: ${formatCurrency(remainingBudget)}`,
            icon: "error",
            draggable: true
        })
    } else if(remainingBudget <= limitBudget(state.budget, 10)) {        
        MySwal.fire({
            title: "Estas por llegar a tu limite",
            text:`Disponibilidad: ${formatCurrency(remainingBudget)}`,
            icon: "warning",
            draggable: true
        })
    }

    const percentageGrafic = +((totalExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center items-center">
                <CircularProgressbar
                    value={percentageGrafic}
                    styles={buildStyles({
                        pathColor: percentageGrafic === 100 ? '#DC2626' : '#28C76F',
                        trailColor: '#ebebeb',
                        textSize: 10,
                        textColor: percentageGrafic === 100 ? '#DC2626' : '#28C76F'
                    })}
                    text={`${percentageGrafic}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-orange-600 hover:bg-orange-700 w-full p-2 uppercase font-bold rounded-lg text-white"
                    onClick={() => dispatch({type: 'reset-app'})}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
