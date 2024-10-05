'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addDays, format } from 'date-fns'

export default function PeriodTracker() {
  const [selectedDates, setSelectedDates] = useState([])
  const [cycleLength, setCycleLength] = useState(29)
  const [periodLength, setPeriodLength] = useState(7)

  const handleDateSelect = (dates) => {
    if (dates) {
      setSelectedDates(dates.sort((a, b) => a.getTime() - b.getTime()))
    }
  }

  const getExpectedEndDate = () => {
    if (selectedDates.length === 0) return null
    const startDate = selectedDates[0]
    return addDays(startDate, periodLength - 1)
  }

  const formatDate = (date) => {
    return date ? format(date, 'MMMM d, yyyy') : ''
  }

  const handlePeriodLengthChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setPeriodLength(value)
    }
  }

  const handleCycleLengthChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setCycleLength(value)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Menstruation Tracker</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Period Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Period Information</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDates.length > 0 ? (
                <>
                  <p className="text-red-400">Period is expected to end on {formatDate(getExpectedEndDate())}</p>
                  <p className="text-gray-400">This period lasts for a total of {periodLength} days</p>
                </>
              ) : (
                <p>Select your period start date on the calendar</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="periodLength" className="w-1/2">Avg period duration:</Label>
                <Input
                  id="periodLength"
                  type="number"
                  value={periodLength}
                  onChange={handlePeriodLengthChange}
                  min="1"
                  className="w-1/2 bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Label htmlFor="cycleLength" className="w-1/2">Avg cycle length:</Label>
                <Input
                  id="cycleLength"
                  type="number"
                  value={cycleLength}
                  onChange={handleCycleLengthChange}
                  min="1"
                  className="w-1/2 bg-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" variant="default">
            Period hasn't ended
          </Button>
        </div>
      </div>
    </div>
  )
}