# Blaster Router (dev use only)
This router is used for manual trigger of blasting of a inserted campaignb record.

This blaster is independent of the blaster process.


### Single Blast
```
POST /blaster/single
Role Required: admin/user

{
  "recordId": STRING,
}
```

### Batch Blast
```
POST /blaster/batch
Role Required: admin/user

{
  "recordIds": List<STRING>,
}
```
