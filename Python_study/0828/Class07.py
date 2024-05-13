import calendar

month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

print(calendar.calendar(2023))

print(calendar.month(2023, 8))

print(calendar.weekday(2023,8,28))

print(list(calendar.month_name)[1:])

print(list(calendar.month_abbr)[1:])