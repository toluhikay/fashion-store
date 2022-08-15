import React from 'react'
import './form-input.styles.scss'

function FormInput({label, ...otherProps}) {
  return (
    <div className='group'>
        <input type="text" {...otherProps} className='form-input' />
        {
            label && (
                <label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>{label}</label>
            )
        }
        
    </div>
  )
}

export default FormInput