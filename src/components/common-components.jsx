import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const MinimalCallActionBtn = props => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant='outline' size={props.size} className={cn('ml-5 rounded-full aspect-square p-5 px-3', props.className)} {...props}>
            {props.children}
          </Button>
        </TooltipTrigger>
        {props.toolTipText && (
          <TooltipContent className={cn('ml-5', props.toolTipClassName)}>
            <p>{props.toolTipText}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export const MinimalSelection = ({ id = 'z', placeholder = 'Select', title }) => {
  return (
    <div className='mt-5'>
      <Label htmlFor={id} className='pb-2'>
        {title}
      </Label>
      <Select>
        <SelectTrigger className='w-full mt-1'>
          <SelectValue placeholder={placeholder} id={id} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
