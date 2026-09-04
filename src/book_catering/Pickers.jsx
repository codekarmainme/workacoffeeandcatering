import React, { useState, useEffect, useRef } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

// ---------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function DatePicker({ value, onChange, placeholder = 'Select a date' }) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00')
      return isNaN(d) ? new Date() : d
    }
    return new Date()
  })
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const today = todayISO()

  const formatDisplay = () => {
    if (!value) return ''
    const d = new Date(value + 'T00:00:00')
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)

  const changeMonth = (dir) => {
    setViewDate(new Date(year, month + dir, 1))
  }

  const selectDate = (day) => {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(iso)
    setViewDate(new Date(year, month, day))
    setOpen(false)
  }

  return (
    <div className="picker-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className={`picker-field ${value ? 'picker-filled' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <Calendar size={16} className="picker-field-icon" />
        <span className="picker-field-text">{value ? formatDisplay() : placeholder}</span>
      </button>

      {open && (
        <div className="picker-popover">
          <div className="picker-header">
            <button type="button" className="picker-nav" onClick={() => changeMonth(-1)}>
              <ChevronLeft size={16} />
            </button>
            <span className="picker-header-label">
              {MONTHS[month]} {year}
            </span>
            <button type="button" className="picker-nav" onClick={() => changeMonth(1)}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="picker-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="picker-weekday">{w}</span>
            ))}
          </div>

          <div className="picker-days">
            {cells.map((day, i) => {
              if (day === null) return <span key={`e${i}`} className="picker-day empty" />
              const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const disabled = iso < today
              const isSelected = iso === value
              const isToday = iso === today
              return (
                <button
                  key={iso}
                  type="button"
                  className={[
                    'picker-day',
                    disabled ? 'picker-day-disabled' : '',
                    isSelected ? 'picker-day-selected' : '',
                    isToday ? 'picker-day-today' : '',
                  ].join(' ')}
                  disabled={disabled}
                  onClick={() => selectDate(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------
// TimePicker
// ---------------------------------------------------------------------

function buildTimes() {
  const times = []
  for (let h = 7; h <= 21; h++) {
    const h12 = h % 12 === 0 ? 12 : h % 12
    const ampm = h < 12 ? 'AM' : 'PM'
    times.push({
      label: `${String(h12).padStart(2, '0')}:00 ${ampm}`,
      value: `${String(h).padStart(2, '0')}:00`,
    })
    times.push({
      label: `${String(h12).padStart(2, '0')}:30 ${ampm}`,
      value: `${String(h).padStart(2, '0')}:30`,
    })
  }
  return times
}

const TIME_SLOTS = buildTimes()

export function TimePicker({ value, onChange, placeholder = 'Select a time' }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDisplay = () => {
    if (!value) return ''
    const [h, m] = value.split(':').map(Number)
    const h12 = h % 12 === 0 ? 12 : h % 12
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const selectTime = (slot) => {
    onChange(slot.value)
    setOpen(false)
  }

  return (
    <div className="picker-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className={`picker-field ${value ? 'picker-filled' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <Clock size={16} className="picker-field-icon" />
        <span className="picker-field-text">{value ? formatDisplay() : placeholder}</span>
      </button>

      {open && (
        <div className="picker-popover time-popover">
          <div className="picker-header time-header">
            <span className="picker-header-label">Select a time</span>
          </div>
          <div className="time-slots">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                type="button"
                className={`time-slot ${value === slot.value ? 'time-slot-selected' : ''}`}
                onClick={() => selectTime(slot)}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
