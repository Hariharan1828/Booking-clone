'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import {BedDoubleIcon, CalendarRangeIcon, FormInput} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addDays, format } from "date-fns"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { Popover,PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

export const formSchema = z.object({
    location: z.string().min(2, "must be 2 characters or more").max(50),
    dates: z.object({
        from:z.date(),
        to:z.date(),
    }),
    adults: z.string()
    .min(1,{
        message:"please select atleast one adult"
    })
    .max(12, {message:"Maximum is 12 person occupencies"}),

    children: z.string()
    .min(0)
    .max(12, {message:"Maximum is 12 child occupencies"}),

    rooms: z.string().min(1,{
        message:"please select at least 1 room"
    }),
    
  });
 

  

function SearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      location:"",
      dates:{from: new Date(),to:new Date()},
      adults:"1",
      children:"0",
      rooms:"1"
    }
  })


  function onSubmit(values: z.infer<typeof formSchema>){

    const checkin_monthday = values.dates.from.getDate().toString();
    const checkin_month = (values.dates.from.getMonth()+1).toString;
    const checkin_year = values.dates.from.getFullYear().toString();


    const checkout_monthday= values.dates.to.getDate().toString();
    const checkout_month = (values.dates.to.getMonth()+1).toString;
    const checkout_year = values.dates.to.getFullYear().toString();

    const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
    const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`;

    const url = new URL("https://www.booking.com/searchresults.html");
    url.searchParams.set("ss",values.location);
    url.searchParams.set("group_adults", values.adults);
    url.searchParams.set("group_children", values.children);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);
    url.searchParams.set("no_room", values.rooms);

    router.push(`/search?url=${url.href}`);

  }
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // })
  return (


    <Form {...form}>
      <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex flex-col items-center space-y-4 lg:flex-row 
      lg:max-w-6xl lg:mx-auto lg:space-y-0 rounded-lg'
      >
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
          control={form.control}
          name="location"
          render={({field})=>(
            <FormItem>
              <FormLabel className='text-white flex'>
                location
                <BedDoubleIcon className='ml-2 h-4 w-4 text-white'/>
              </FormLabel>

              <FormMessage/>

              <FormControl>
              <Input placeholder='London, UK'{...field} />
              </FormControl>

            </FormItem>
          )}        

          
          ></FormField>
        </div>
        <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5 lg:ml-2">
          <FormField
          control={form.control}
          name="dates"
          render={({field})=>(
            <FormItem className='flex flex-col'>
              <FormLabel className='text-white flex'>
                dates
                <CalendarRangeIcon className='ml-2 h-4 w-4 text-white'/>
              </FormLabel>
              <FormMessage/>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                    id='date'
                    name="dates"
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !field.value.from  && "text-muted-foreground")}
                    
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        ) }
                    </Button>

                  </FormControl>

                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                       initialFocus
                       mode="range"
                       defaultMonth={field.value?.from}
                       selected={field.value}
                       onSelect={field.onChange}
                       numberOfMonths={2}
                       modifiers={{
                        disabled: { before: new Date() }, // Disable dates before the current date
                      }}
                      />

                  
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
          ></FormField>
        </div>

        <div className="flex w-full items-center space-x-2 lg:ml-2">
          <div className="grid items-center flex-1">
            <FormField
            control={form.control}
            name="adults"
            render={({field})=>(
              <FormItem className='flex flex-col'>
                <FormLabel className='text-white'> Adults</FormLabel>
                <FormMessage/>
                <FormControl>
                  <Input className='text-muted-foreground' type='number' placeholder='Adults' {...field}/>
                </FormControl>
              </FormItem>
            )}
            
            >
            </FormField>
          </div>
          <div className="grid items-center flex-1">
            <FormField
            control={form.control}
            name="children"
            render={({field})=>(
              <FormItem className='flex flex-col'>
                <FormLabel className='text-white'> Children</FormLabel>
                <FormMessage/>
                <FormControl>
                  <Input className='text-muted-foreground' type='number' placeholder='children' {...field}/>
                </FormControl>
              </FormItem>
            )}
            
            >
            </FormField>
          </div>
          <div className="grid items-center flex-1">
            <FormField
            control={form.control}
            name="rooms"
            render={({field})=>(
              <FormItem className='flex flex-col'>
                <FormLabel className='text-white'> Rooms</FormLabel>
                <FormMessage/>
                <FormControl>
                  <Input className='text-muted-foreground' type='number' placeholder='rooms' {...field}/>
                </FormControl>
              </FormItem>
            )}
            
            >
            </FormField>
          </div>
          <div className="mt-auto">
          <Button type='submit' className='bg-blue-500 text-base'> Search</Button>
        </div>

        </div>
       
      </form>

    </Form>
  )
}
export default SearchForm;
