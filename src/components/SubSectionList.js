import React from 'react'
import css from "../styles/subSectionList.module.css"

const SubSectionList = ({ subSection }) => {
    return (
        <div className={css.table_container}>
            {subSection.length !== 0 &&
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th className={css['subsection_code']}>Subsection Code</th>
                            <th className={css.subsection}>Subsection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subSection.map((item) => (
                            <tr>
                                <td className={css['subsection_code']}>{item.subSectionCode}</td>
                                <td className={css.subsection}>{item.subSection}</td>
                            </tr>
                        ))}

                        {/* Add more rows as needed */}
                    </tbody>
                </table>}
        </div>

    )
}

export default SubSectionList