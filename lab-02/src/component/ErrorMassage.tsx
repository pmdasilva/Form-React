

type ErrorMassageProps = {
    massageError: string;
}

export default function ErrorMassage({ massageError }: ErrorMassageProps) {

    console.log(massageError)


    return (

        <div>
            {massageError && (
                <div
                    className="
                                rounded-md
                                border
                                border-red-400
                                bg-red-100
                                p-3
                                text-sm
                                text-center
                                text-red-700
                            "
                >
                    {massageError}
                </div>
            )}
        </div>

    )
}