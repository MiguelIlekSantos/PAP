import React from 'react'
import { Collapse } from './Collapse';

type Props = {
    department: string;
}

// function convertStringToTime(time:string) {
//     if () {
        
//     }
// }

export const Schedule = (props: Props) => {
    const hours = Array.from({ length: 25 }, (_, i) => `${i}:00`);

    const barNum = Array.from({ length: 2 });
    
    const days = [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado',
    ];
    const employees = [
        {
            name: "Rodrigo",
            startWork: "8:30",
            hasLunch: true,
            lunchStart: "13:00",
            lunchEnd: "14:00",
            endWork: "18:00",
            shiftType: "5x2",
            days: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira"]
        },
        {
            name: "Miguel",
            startWork: "9:00",
            hasLunch: false,
            lunchStart: "",
            lunchEnd: "",
            endWork: "13:00",
            shiftType: "6x1",
            days: ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
        },
        {
            name: "Isabella",
            startWork: "0:00",
            hasLunch: true,
            lunchStart: "4:00",
            lunchEnd: "5:00",
            endWork: "9:00",
            shiftType: "12x36",
            days: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"]
        },
        {
            name: "Isabella",
            startWork: "0:00",
            hasLunch: true,
            lunchStart: "4:00",
            lunchEnd: "5:00",
            endWork: "9:00",
            shiftType: "12x36",
            days: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"]
        },
        {
            name: "Isabella",
            startWork: "0:00",
            hasLunch: true,
            lunchStart: "4:00",
            lunchEnd: "5:00",
            endWork: "9:00",
            shiftType: "12x36",
            days: ["Segunda-Feira", "Quarta-Feira", "Sexta-Feira"]
        }
    ]

    return (
        <>
            <Collapse title='Filial'>
                {days.map(day => (
                    <Collapse key={day} title={day} limited={true}>
                        <div className='grid grid-cols-[100px_repeat(25,minmax(50px,1fr))]'>
                            <p></p>
                            {
                                hours.map((hour, id) => (
                                    <p key={id}>
                                        {hour}
                                    </p>
                                ))
                            }
                        </div>
                        {
                            employees.map((employee, id) => {
                                
                                if(!employee.days.includes(day)) return null;

                                return (
                                    <div key={id} className='grid grid-cols-[100px_repeat(25,minmax(50px,1fr))] mt-2 p-2'>
                                        <p>{employee.name}</p>
                                        {employee.hasLunch ? (
                                            barNum.map((a, id) => {
                                                return (
                                                    <>
                                                        <div className={`bg-violet-600 col-start-[-${4}] col-end-${8}`}></div>
                                                        <div className={`bg-violet-600 col-start-${9} col-end-${16}`}></div>
                                                    </>
                                                );
                                            })
                                        ) : (
                                            <p>b</p>
                                        )
                                        }
                                    </div>
                                );
                            })
                        }
                    </Collapse>
                ))}
            </Collapse>
        </>
    )
}
