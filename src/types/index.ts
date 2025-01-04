// Gastos
export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value
}

// Gasto temporal
export type DraftExpense = Omit<Expense, 'id'> // Omit no toma el valor que indiques

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: string
    name: string
    icon: string
}