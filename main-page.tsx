import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, Phone, Mail, MapPin, CalendarIcon, Clock, DollarSign, Utensils, Users } from 'lucide-react'

const allRestaurants = [
  { 
    id: 1, 
    name: "Abay's Delight", 
    type: "Kazakh", 
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    maxParty: 5,
    location: "123 Abay Avenue, Almaty",
    workingHours: "10:00 - 22:00",
    averageCheck: 5000,
    description: "Traditional Kazakh cuisine in a modern setting.",
    features: ["Family-friendly", "Outdoor seating"],
    totalSeats: 20,
    availableTables: { 
      "2023-10-19": { "10:00": Math.floor(Math.random() * 8) + 2, "12:00": Math.floor(Math.random() * 12) + 2, "14:00": Math.floor(Math.random() * 15) + 2, "16:00": Math.floor(Math.random() * 20) + 2, "18:00": Math.floor(Math.random() * 18) + 2, "20:00": Math.floor(Math.random() * 10) + 2 },
      "2023-10-20": { "10:00": Math.floor(Math.random() * 10) + 2, "12:00": Math.floor(Math.random() * 14) + 2, "14:00": Math.floor(Math.random() * 18) + 2, "16:00": Math.floor(Math.random() * 20) + 2, "18:00": Math.floor(Math.random() * 16) + 2, "20:00": Math.floor(Math.random() * 8) + 2 },
      "2023-10-21": { "10:00": Math.floor(Math.random() * 12) + 2, "12:00": Math.floor(Math.random() * 16) + 2, "14:00": Math.floor(Math.random() * 20) + 2, "16:00": Math.floor(Math.random() * 18) + 2, "18:00": Math.floor(Math.random() * 14) + 2, "20:00": Math.floor(Math.random() * 6) + 2 }
    },
  },
  { 
    id: 2, 
    name: "Silk Road Spices", 
    type: "Central Asian", 
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    maxParty: 8,
    location: "45 Silk Road, Almaty",
    workingHours: "11:00 - 23:00",
    averageCheck: 7000,
    description: "A culinary journey through Central Asia.",
    features: ["Live music", "Vegan options"],
    totalSeats: 30,
    availableTables: { 
      "2023-10-19": { "11:00": Math.floor(Math.random() * 15) + 2, "13:00": Math.floor(Math.random() * 20) + 2, "15:00": Math.floor(Math.random() * 25) + 2, "17:00": Math.floor(Math.random() * 30) + 2, "19:00": Math.floor(Math.random() * 28) + 2, "21:00": Math.floor(Math.random() * 18) + 2 },
      "2023-10-20": { "11:00": Math.floor(Math.random() * 18) + 2, "13:00": Math.floor(Math.random() * 22) + 2, "15:00": Math.floor(Math.random() * 28) + 2, "17:00": Math.floor(Math.random() * 30) + 2, "19:00": Math.floor(Math.random() * 25) + 2, "21:00": Math.floor(Math.random() * 15) + 2 },
      "2023-10-21": { "11:00": Math.floor(Math.random() * 20) + 2, "13:00": Math.floor(Math.random() * 24) + 2, "15:00": Math.floor(Math.random() * 30) + 2, "17:00": Math.floor(Math.random() * 28) + 2, "19:00": Math.floor(Math.random() * 22) + 2, "21:00": Math.floor(Math.random() * 12) + 2 }
    },
  },
  { 
    id: 3, 
    name: "Almaty Steakhouse", 
    type: "American", 
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    maxParty: 10,
    location: "78 Dostyk Avenue, Almaty",
    workingHours: "12:00 - 00:00",
    averageCheck: 10000,
    description: "Premium steaks and American classics.",
    features: ["Full bar", "Private dining rooms"],
    totalSeats: 40,
    availableTables: { 
      "2023-10-19": { "12:00": Math.floor(Math.random() * 20) + 2, "14:00": Math.floor(Math.random() * 25) + 2, "16:00": Math.floor(Math.random() * 35) + 2, "18:00": Math.floor(Math.random() * 40) + 2, "20:00": Math.floor(Math.random() * 38) + 2, "22:00": Math.floor(Math.random() * 30) + 2 },
      "2023-10-20": { "12:00": Math.floor(Math.random() * 22) + 2, "14:00": Math.floor(Math.random() * 28) + 2, "16:00": Math.floor(Math.random() * 38) + 2, "17:00": Math.floor(Math.random() * 40) + 2, "20:00": Math.floor(Math.random() * 35) + 2, "22:00": Math.floor(Math.random() * 25) + 2 },
      "2023-10-21": { "12:00": Math.floor(Math.random() * 25) + 2, "14:00": Math.floor(Math.random() * 30) + 2, "16:00": Math.floor(Math.random() * 40) + 2, "18:00": Math.floor(Math.random() * 38) + 2, "20:00": Math.floor(Math.random() * 32) + 2, "22:00": Math.floor(Math.random() * 20) + 2 }
    },
  },
]

const specialOffers = [
  { id: 1, title: "First Booking Discount", description: "Get 10% off on your first booking!", image: "/placeholder.svg?height=150&width=300" },
  { id: 2, title: "Weekday Lunch Special", description: "20% off on all lunch bookings Monday to Friday", image: "/placeholder.svg?height=150&width=300" },
]

const cuisineTypes = ["All", "Kazakh", "Central Asian", "American"]

export default function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>('')
  const [seats, setSeats] = useState<string>('')
  const [restaurant, setRestaurant] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [showAllRestaurants, setShowAllRestaurants] = useState(false)
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<{ name: string, phone: string, email: string } | null>(null)
  const [bookingHistory, setBookingHistory] = useState<Array<{ restaurant: string, date: string, time: string, partySize: string }>>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof allRestaurants[0] | null>(null)
  const [sortBy, setSortBy] = useState<'averageCheck' | 'cuisine'>('averageCheck')
  const [searchTerm, setSearchTerm] = useState('')
  const [availableSeats, setAvailableSeats] = useState<{ [key: string]: number }>( {})
  const contactsRef = useRef<HTMLDivElement>(null)
  const specialOffersRef = useRef<HTMLDivElement>(null)
  const restaurantsRef = useRef<HTMLDivElement>(null)

  const handleBooking = () => {
    if (!isLoggedIn) {
      setShowLoginForm(true)
      return
    }
    if (restaurant && date && time && seats && typeof seats === 'string' && seats.trim() !== '') {
      const newBooking = {
        restaurant: allRestaurants.find(r => r.id.toString() === restaurant)?.name || '',
        date: date.toDateString(),
        time: time,
        partySize: seats
      }
      setBookingHistory(prev => [...prev, newBooking])
      console.log('Booking:', newBooking)
      alert('Booking successful!')

      // Decrease available seats
      setAvailableSeats(prev => ({
        ...prev,
        [restaurant]: Math.max(0, prev[restaurant] - parseInt(seats))
      }))

      // Reset form fields after successful booking
      setRestaurant('')
      setDate(new Date())
      setTime('')
      setSeats('')
    } else {
      alert('Please fill all fields to book')
    }
  }

  const handleCallBack = () => {
    console.log('Call back requested for:', phoneNumber)
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToRestaurants = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setShowAllRestaurants(true)
    setSelectedCuisine("All")
    scrollToSection(restaurantsRef)
  }

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    // Calculate initial available seats
    const initialAvailableSeats = allRestaurants.reduce((acc, restaurant) => {
      const todayDate = new Date().toISOString().split('T')[0]
      const todayTables = restaurant.availableTables[todayDate]
      if (todayTables) {
        const currentHour = new Date().getHours()
        const currentTimeSlot = Object.keys(todayTables).reduce((closest, time) => {
          const [hour] = time.split(':').map(Number)
          return Math.abs(currentHour - hour) < Math.abs(currentHour - closest.split(':')[0])
            ? time
            : closest
        })
        acc[restaurant.id] = todayTables[currentTimeSlot]
      }
      return acc
    }, {} as { [key: string]: number })
    setAvailableSeats(initialAvailableSeats)
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const filteredRestaurants = allRestaurants
    .filter(restaurant => 
      (selectedCuisine === "All" || restaurant.type === selectedCuisine) &&
      (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       restaurant.type.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'averageCheck') {
      return a.averageCheck - b.averageCheck
    } else {
      return a.type.localeCompare(b.type)
    }
  })

  const displayedRestaurants = showAllRestaurants ? sortedRestaurants : sortedRestaurants.slice(0, 3)

  const getAvailableHours = (restaurantId: string) => {
    const restaurant = allRestaurants.find(r => r.id.toString() === restaurantId)
    if (!restaurant) return []
    
    const [startHour, endHour] = restaurant.workingHours.split(' - ')
    const [startH, startM] = startHour.split(':').map(Number)
    const [endH, endM] = endHour.split(':').map(Number)
    
    const hours = []
    for (let h = startH; h <= endH; h++) {
      if (h === endH && endM === 0) break
      hours.push(`${h.toString().padStart(2, '0')}:00`)
      if (h < endH) hours.push(`${h.toString().padStart(2, '0')}:30`)
    }
    
    return hours
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowLoginForm(false)
    setUserProfile({ name: "John Doe", phone: phoneNumber, email: "john@example.com" })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    setIsLoggedIn(true)
    setShowRegisterForm(false)
    setUserProfile({ name, phone, email })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserProfile(null)
    setBookingHistory([])
  }

  const handleRestaurantSelect = (id: string) => {
    const selected = allRestaurants.find(r => r.id.toString() === id)
    setSelectedRestaurant(selected || null)
    setRestaurant(id)
  }

  const availableRestaurants = allRestaurants.filter(r => {
    const dateString = date?.toISOString().split('T')[0]
    return r.availableTables[dateString] && Object.values(r.availableTables[dateString]).some(tables => tables >= parseInt(seats))
  })

  const handleCancelBooking = (index: number) => {
    setBookingHistory(prev => prev.filter((_, i) => i !== index));
    alert('Booking cancelled successfully!');
  }

  const handlePayDeposit = (index: number) => {
    alert(`Deposit paid for booking ${index + 1}. Thank you for confirming your reservation!`);
    // In a real application, this would initiate a payment process
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB]">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[rgb(0,0,0)]">AlmatyDine</Link>
          <div className="flex-grow mx-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search restaurants..." 
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F5F5F5] text-[rgb(0,0,0)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(0,0,0)]" size={20} />
            </div>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-[rgb(0,0,0)] hover:text-[#E0E0E0]">Home</Link>
            <a href="#restaurants" onClick={scrollToRestaurants} className="text-[rgb(0,0,0)] hover:text-[#E0E0E0]">Restaurants</a>
            <a href="#special-offers" onClick={() => scrollToSection(specialOffersRef)} className="text-[rgb(0,0,0)] hover:text-[#E0E0E0]">Special Offers</a>
            <a href="#contacts" onClick={() => scrollToSection(contactsRef)} className="text-[rgb(0,0,0)] hover:text-[#E0E0E0]">Contacts</a>
          </nav>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-[rgb(0,0,0)] hover:text-[#E0E0E0]" onClick={() => setShowLoginForm(!showLoginForm)}>
              <User className="h-5 w-5" />
              <span className="sr-only">{isLoggedIn ? 'Profile' : 'Login'}</span>
            </Button>
            {showLoginForm && !isLoggedIn && (
              <Card className="absolute right-0 mt-2 w-64 bg-white">
                <CardHeader className="bg-[rgb(0,0,0)] text-white">
                  <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <Input type="tel" placeholder="Phone number" className="mb-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <Input type="password" placeholder="Password" className="mb-2" />
                    <Button type="submit" className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">Login</Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" onClick={() => { setShowLoginForm(false); setShowRegisterForm(true); }}>
                    Don't have an account? Register
                  </Button>
                </CardFooter>
              </Card>
            )}
            {showRegisterForm && (
              <Card className="absolute right-0 mt-2 w-64 bg-white">
                <CardHeader className="bg-[rgb(0,0,0)] text-white">
                  <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister}>
                    <Input type="text" name="name" placeholder="Name" className="mb-2" />
                    <Input type="tel" name="phone" placeholder="Phone number" className="mb-2" />
                    <Input type="email" name="email" placeholder="Email" className="mb-2" />
                    <Input type="password" name="password" placeholder="Password" className="mb-2" />
                    <Button type="submit" className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">Register</Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" onClick={() => { setShowRegisterForm(false); setShowLoginForm(true); }}>
                    Already have an account? Login
                  </Button>
                </CardFooter>
              </Card>
            )}
            {isLoggedIn && showLoginForm && (
              <Card className="absolute right-0 mt-2 w-80 bg-white">
                <CardHeader className="bg-[rgb(0,0,0)] text-white">
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Name: {userProfile?.name}</p>
                  <p>Phone: {userProfile?.phone}</p>
                  <p>Email: {userProfile?.email}</p>
                  <h3 className="mt-4 font-semibold">Booking History</h3>
                  <div className="mt-2 p-2 bg-[#F5F5F5] rounded-md max-h-40 overflow-y-auto">
                    {bookingHistory.length > 0 ? (
                      <ul className="space-y-2">
                        {bookingHistory.map((booking, index) => (
                          <li key={index} className="flex flex-col gap-2 border-b border-gray-200 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
                            <span>{booking.restaurant} - {booking.date} at {booking.time} for {booking.partySize} people</span>
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm"
                                onClick={() => handlePayDeposit(index)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Pay Deposit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleCancelBooking(index)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No bookings yet</p>
                    )}
                  </div>
                  <Button className="mt-4 w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">
                    {userProfile?.email ? 'Edit Email' : 'Add Email'}
                  </Button>
                  <Button className="mt-2 w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white" onClick={() => scrollToSection(specialOffersRef)}>
                    Check Special Offers
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleLogout} className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">Logout</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-[rgb(0,0,0)]">Discover Almaty's Best Restaurants</h1>
          <div className="max-w-4xl mx-auto bg-[#F5F5F5] rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)]">Find Your Perfect Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(0,0,0)] mb-1">Restaurant</label>
                <Select onValueChange={setRestaurant} value={restaurant}>
                  <SelectTrigger className="bg-white text-[rgb(0,0,0)]">
                    <SelectValue placeholder="Select restaurant" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {allRestaurants.map((restaurant) => (
                      <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[rgb(0,0,0)] mb-1">Date</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-white text-[rgb(0,0,0)]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#FEFDFB]">
                    <DialogHeader>
                      <DialogTitle className="text-[rgb(0,0,0)]">Choose a date</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border bg-white"
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <label className="block text-sm font-medium text-[rgb(0,0,0)] mb-1">Time</label>
                <Select onValueChange={setTime} value={time}>
                  <SelectTrigger className="bg-white text-[rgb(0,0,0)]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {restaurant ? (
                      getAvailableHours(restaurant).map((hour) => (
                        <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>Please select a restaurant first</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[rgb(0,0,0)] mb-1">Party Size</label>
                <Select onValueChange={setSeats} value={seats}>
                  <SelectTrigger className="bg-white text-[rgb(0,0,0)]">
                    <SelectValue placeholder="Number of people" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {[1, 2, 3, 4, 5, 6].map((size) => (
                      <SelectItem key={size} value={size.toString()}>{size} {size === 1 ? 'person' : 'people'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="mt-4 w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white" onClick={handleBooking}>Book Now</Button>
          </div>
        </section>

        {!restaurant && seats && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)]">Available Restaurants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="bg-[#F5F5F5]">
                  <CardHeader>
                    <CardTitle className="text-[rgb(0,0,0)]">{restaurant.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[rgb(0,0,0)]">{restaurant.type} Cuisine</p>
                    <p className="text-sm text-[rgb(0,0,0)]">Max party size: {restaurant.maxParty}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleRestaurantSelect(restaurant.id.toString())} className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">
                      Select
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section id="restaurants" ref={restaurantsRef} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)]">Our Restaurants</h2>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <Select onValueChange={(value) => setSortBy(value as 'averageCheck' | 'cuisine')}>
              <SelectTrigger className="w-[180px] bg-white text-[rgb(0,0,0)]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="averageCheck">Average Check</SelectItem>
                <SelectItem value="cuisine">Cuisine</SelectItem>
              </SelectContent>
            </Select>
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`${
                  selectedCuisine === cuisine
                    ? 'bg-[rgb(0,0,0)] text-white'
                    : 'bg-[#F5F5F5] text-[rgb(0,0,0)]'
                } hover:bg-[#E0E0E0] hover:text-white`}
              >
                {cuisine}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="bg-[#F5F5F5]">
                <CardHeader>
                  <CardTitle className="text-[rgb(0,0,0)]">{restaurant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="info">Info</TabsTrigger>
                      <TabsTrigger value="images">Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><Utensils className="mr-2" size={16} /> {restaurant.type} Cuisine</p>
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><MapPin className="mr-2" size={16} /> {restaurant.location}</p>
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><Clock className="mr-2" size={16} /> {restaurant.workingHours}</p>
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><DollarSign className="mr-2" size={16} /> Average check: {restaurant.averageCheck} KZT</p>
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><Users className="mr-2" size={16} /> Available seats: {availableSeats[restaurant.id] || restaurant.totalSeats || 0}</p>
                      <p className="flex items-center mt-2 text-sm text-[rgb(0,0,0)]"><Users className="mr-2" size={16} /> Rating: 4,5</p>
                    </TabsContent>
                    <TabsContent value="images">
                      <div className="grid grid-cols-3 gap-2">
                        {restaurant.images.map((image, index) => (
                          <Image key={index} src={image} alt={`${restaurant.name} image ${index + 1}`} width={100} height={100} className="rounded-md" />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white" onClick={() => handleRestaurantSelect(restaurant.id.toString())}>
                    <Link href="#find-table">Book a Table</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {!showAllRestaurants && filteredRestaurants.length > 3 && (
            <div className="text-center mt-8">
              <Button onClick={() => setShowAllRestaurants(true)} className="bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white<continuation_point>
                ">
                Show All Restaurants
              </Button>
            </div>
          )}
        </section>

        <section id="special-offers" ref={specialOffersRef} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)]">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="flex flex-col bg-[#F5F5F5]">
                <CardHeader>
                  <CardTitle className="text-[rgb(0,0,0)]">{offer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image src={offer.image} alt={offer.title} width={300} height={150} className="rounded-md mb-4" />
                  <p className="text-[rgb(0,0,0)]">{offer.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">Claim Offer</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-[#F5F5F5] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)]">Need Help?</h2>
          <p className="mb-4 text-[rgb(0,0,0)]">Having issues with booking or any other problems? Our customer service team is here to help!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap6">
            <div>
              <h3 className="text-lg font-semibold mb-2  text-[rgb(0,0,0)]">Contact Us</h3>
              <p className="flex items-center mb-2  text-[rgb(0,0,0)]"><Phone className="mr-2" /> +7 727 1234567</p>
              <p className="flex items-center text-[rgb(0,0,0)]"><Mail className="mr-2" /> support@almatydine.kz</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[rgb(0,0,0)]">Request a Call Back</h3>
              <div className="flex">
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  className="mr-2 bg-white text-[rgb(0,0,0)]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={handleCallBack} className="bg-[rgb(0,0,0)] hover:bg-[#E0E0E0] text-white">
                  Call Me
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" ref={contactsRef} className="bg-[rgb(0,0,0)] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About AlmatyDine</h3>
              <p>Your premier restaurant booking platform in Almaty, Kazakhstan. We connect food lovers with the best dining experiences the city has to offer.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/restaurants" className="hover:text-[#E0E0E0]">All Restaurants</Link></li>
                <li><Link href="/terms" className="hover:text-[#E0E0E0]">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-[#E0E0E0]">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><Phone className="mr-2" /> +7 727 123 4567</li>
                <li className="flex items-center"><Mail className="mr-2" /> info@almatydine.kz</li>
                <li className="flex items-center"><MapPin className="mr-2" /> 123 Abay Avenue, Almaty, Kazakhstan</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 AlmatyDine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default MainPage;