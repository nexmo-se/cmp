SELECT
  `CmpRecord`.*,
  `cmpTemplate`.`id` AS `cmpTemplate.id`,
  `cmpTemplate`.`name` AS `cmpTemplate.name`,
  `cmpTemplate`.`cmpChannelId` AS `cmpTemplate.cmpChannelId`,
  `cmpTemplate`.`whatsappTemplateNamespace` AS `cmpTemplate.whatsappTemplateNamespace`,
  `cmpTemplate`.`whatsappTemplateName` AS `cmpTemplate.whatsappTemplateName`,
  `cmpTemplate`.`viberTtl` AS `cmpTemplate.viberTtl`,
  `cmpTemplate`.`facebookTag` AS `cmpTemplate.facebookTag`,
  `cmpTemplate`.`category` AS `cmpTemplate.category`,
  `cmpTemplate`.`mediaType` AS `cmpTemplate.mediaType`,
  `cmpTemplate`.`body` AS `cmpTemplate.body`,
  `cmpTemplate`.`deleted` AS `cmpTemplate.deleted`,
  `cmpTemplate`.`createdAt` AS `cmpTemplate.createdAt`,
  `cmpTemplate`.`updatedAt` AS `cmpTemplate.updatedAt`,
  `cmpTemplate->cmpChannel`.`id` AS `cmpTemplate.cmpChannel.id`,
  `cmpTemplate->cmpChannel`.`name` AS `cmpTemplate.cmpChannel.name`,
  `cmpTemplate->cmpChannel`.`channel` AS `cmpTemplate.cmpChannel.channel`,
  `cmpTemplate->cmpChannel`.`senderId` AS `cmpTemplate.cmpChannel.senderId`,
  `cmpTemplate->cmpChannel`.`tps` AS `cmpTemplate.cmpChannel.tps`,
  `cmpTemplate->cmpChannel`.`smsUseSignature` AS `cmpTemplate.cmpChannel.smsUseSignature`,
  `cmpTemplate->cmpChannel`.`cmpApplicationId` AS `cmpTemplate.cmpChannel.cmpApplicationId`,
  `cmpTemplate->cmpChannel`.`cmpApiKeyId` AS `cmpTemplate.cmpChannel.cmpApiKeyId`,
  `cmpTemplate->cmpChannel`.`deleted` AS `cmpTemplate.cmpChannel.deleted`,
  `cmpTemplate->cmpChannel`.`createdAt` AS `cmpTemplate.cmpChannel.createdAt`,
  `cmpTemplate->cmpChannel`.`updatedAt` AS `cmpTemplate.cmpChannel.updatedAt`,
  `cmpTemplate->cmpChannel->cmpApplication`.`id` AS `cmpTemplate.cmpChannel.cmpApplication.id`,
  `cmpTemplate->cmpChannel->cmpApplication`.`name` AS `cmpTemplate.cmpChannel.cmpApplication.name`,
  `cmpTemplate->cmpChannel->cmpApplication`.`cmpApiKeyId` AS `cmpTemplate.cmpChannel.cmpApplication.cmpApiKeyId`,
  `cmpTemplate->cmpChannel->cmpApplication`.`applicationId` AS `cmpTemplate.cmpChannel.cmpApplication.applicationId`,
  `cmpTemplate->cmpChannel->cmpApplication`.`privateKey` AS `cmpTemplate.cmpChannel.cmpApplication.privateKey`,
  `cmpTemplate->cmpChannel->cmpApplication`.`deleted` AS `cmpTemplate.cmpChannel.cmpApplication.deleted`,
  `cmpTemplate->cmpChannel->cmpApplication`.`createdAt` AS `cmpTemplate.cmpChannel.cmpApplication.createdAt`,
  `cmpTemplate->cmpChannel->cmpApplication`.`updatedAt` AS `cmpTemplate.cmpChannel.cmpApplication.updatedAt`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`id` AS `cmpTemplate.cmpChannel.cmpApiKey.id`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`name` AS `cmpTemplate.cmpChannel.cmpApiKey.name`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`apiKey` AS `cmpTemplate.cmpChannel.cmpApiKey.apiKey`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`apiSecret` AS `cmpTemplate.cmpChannel.cmpApiKey.apiSecret`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`signatureSecret` AS `cmpTemplate.cmpChannel.cmpApiKey.signatureSecret`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`signatureMethod` AS `cmpTemplate.cmpChannel.cmpApiKey.signatureMethod`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`deleted` AS `cmpTemplate.cmpChannel.cmpApiKey.deleted`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`createdAt` AS `cmpTemplate.cmpChannel.cmpApiKey.createdAt`,
  `cmpTemplate->cmpChannel->cmpApiKey`.`updatedAt` AS `cmpTemplate.cmpChannel.cmpApiKey.updatedAt`,
  `cmpMedia`.`id` AS `cmpMedia.id`,
  `cmpMedia`.`mediaType` AS `cmpMedia.mediaType`,
  `cmpMedia`.`cmpMediaTextId` AS `cmpMedia.cmpMediaTextId`,
  `cmpMedia`.`cmpMediaImageId` AS `cmpMedia.cmpMediaImageId`,
  `cmpMedia`.`cmpMediaAudioId` AS `cmpMedia.cmpMediaAudioId`,
  `cmpMedia`.`cmpMediaVideoId` AS `cmpMedia.cmpMediaVideoId`,
  `cmpMedia`.`cmpMediaFileId` AS `cmpMedia.cmpMediaFileId`,
  `cmpMedia`.`cmpMediaLocationId` AS `cmpMedia.cmpMediaLocationId`,
  `cmpMedia`.`cmpMediaViberTemplateId` AS `cmpMedia.cmpMediaViberTemplateId`,
  `cmpMedia`.`deleted` AS `cmpMedia.deleted`,
  `cmpMedia`.`createdAt` AS `cmpMedia.createdAt`,
  `cmpMedia`.`updatedAt` AS `cmpMedia.updatedAt`,
  `cmpMedia->cmpMediaText`.`id` AS `cmpMedia.cmpMediaText.id`,
  `cmpMedia->cmpMediaText`.`text` AS `cmpMedia.cmpMediaText.text`,
  `cmpMedia->cmpMediaText`.`deleted` AS `cmpMedia.cmpMediaText.deleted`,
  `cmpMedia->cmpMediaText`.`createdAt` AS `cmpMedia.cmpMediaText.createdAt`,
  `cmpMedia->cmpMediaText`.`updatedAt` AS `cmpMedia.cmpMediaText.updatedAt`,
  `cmpMedia->cmpMediaImage`.`id` AS `cmpMedia.cmpMediaImage.id`,
  `cmpMedia->cmpMediaImage`.`url` AS `cmpMedia.cmpMediaImage.url`,
  `cmpMedia->cmpMediaImage`.`caption` AS `cmpMedia.cmpMediaImage.caption`,
  `cmpMedia->cmpMediaImage`.`deleted` AS `cmpMedia.cmpMediaImage.deleted`,
  `cmpMedia->cmpMediaImage`.`createdAt` AS `cmpMedia.cmpMediaImage.createdAt`,
  `cmpMedia->cmpMediaImage`.`updatedAt` AS `cmpMedia.cmpMediaImage.updatedAt`,
  `cmpMedia->cmpMediaAudio`.`id` AS `cmpMedia.cmpMediaAudio.id`,
  `cmpMedia->cmpMediaAudio`.`url` AS `cmpMedia.cmpMediaAudio.url`,
  `cmpMedia->cmpMediaAudio`.`deleted` AS `cmpMedia.cmpMediaAudio.deleted`,
  `cmpMedia->cmpMediaAudio`.`createdAt` AS `cmpMedia.cmpMediaAudio.createdAt`,
  `cmpMedia->cmpMediaAudio`.`updatedAt` AS `cmpMedia.cmpMediaAudio.updatedAt`,
  `cmpMedia->cmpMediaVideo`.`id` AS `cmpMedia.cmpMediaVideo.id`,
  `cmpMedia->cmpMediaVideo`.`url` AS `cmpMedia.cmpMediaVideo.url`,
  `cmpMedia->cmpMediaVideo`.`caption` AS `cmpMedia.cmpMediaVideo.caption`,
  `cmpMedia->cmpMediaVideo`.`deleted` AS `cmpMedia.cmpMediaVideo.deleted`,
  `cmpMedia->cmpMediaVideo`.`createdAt` AS `cmpMedia.cmpMediaVideo.createdAt`,
  `cmpMedia->cmpMediaVideo`.`updatedAt` AS `cmpMedia.cmpMediaVideo.updatedAt`,
  `cmpMedia->cmpMediaFile`.`id` AS `cmpMedia.cmpMediaFile.id`,
  `cmpMedia->cmpMediaFile`.`url` AS `cmpMedia.cmpMediaFile.url`,
  `cmpMedia->cmpMediaFile`.`caption` AS `cmpMedia.cmpMediaFile.caption`,
  `cmpMedia->cmpMediaFile`.`fileName` AS `cmpMedia.cmpMediaFile.fileName`,
  `cmpMedia->cmpMediaFile`.`deleted` AS `cmpMedia.cmpMediaFile.deleted`,
  `cmpMedia->cmpMediaFile`.`createdAt` AS `cmpMedia.cmpMediaFile.createdAt`,
  `cmpMedia->cmpMediaFile`.`updatedAt` AS `cmpMedia.cmpMediaFile.updatedAt`,
  `cmpMedia->cmpMediaLocation`.`id` AS `cmpMedia.cmpMediaLocation.id`,
  `cmpMedia->cmpMediaLocation`.`latitude` AS `cmpMedia.cmpMediaLocation.latitude`,
  `cmpMedia->cmpMediaLocation`.`longitude` AS `cmpMedia.cmpMediaLocation.longitude`,
  `cmpMedia->cmpMediaLocation`.`name` AS `cmpMedia.cmpMediaLocation.name`,
  `cmpMedia->cmpMediaLocation`.`address` AS `cmpMedia.cmpMediaLocation.address`,
  `cmpMedia->cmpMediaLocation`.`deleted` AS `cmpMedia.cmpMediaLocation.deleted`,
  `cmpMedia->cmpMediaLocation`.`createdAt` AS `cmpMedia.cmpMediaLocation.createdAt`,
  `cmpMedia->cmpMediaLocation`.`updatedAt` AS `cmpMedia.cmpMediaLocation.updatedAt`,
  `cmpMedia->cmpMediaViberTemplate`.`id` AS `cmpMedia.cmpMediaViberTemplate.id`,
  `cmpMedia->cmpMediaViberTemplate`.`url` AS `cmpMedia.cmpMediaViberTemplate.url`,
  `cmpMedia->cmpMediaViberTemplate`.`caption` AS `cmpMedia.cmpMediaViberTemplate.caption`,
  `cmpMedia->cmpMediaViberTemplate`.`actionUrl` AS `cmpMedia.cmpMediaViberTemplate.actionUrl`,
  `cmpMedia->cmpMediaViberTemplate`.`deleted` AS `cmpMedia.cmpMediaViberTemplate.deleted`,
  `cmpMedia->cmpMediaViberTemplate`.`createdAt` AS `cmpMedia.cmpMediaViberTemplate.createdAt`,
  `cmpMedia->cmpMediaViberTemplate`.`updatedAt` AS `cmpMedia.cmpMediaViberTemplate.updatedAt`,
  `cmpParameters`.`id` AS `cmpParameters.id`,
  `cmpParameters`.`cmpRecordId` AS `cmpParameters.cmpRecordId`,
  `cmpParameters`.`parameter` AS `cmpParameters.parameter`,
  `cmpParameters`.`order` AS `cmpParameters.order`,
  `cmpParameters`.`deleted` AS `cmpParameters.deleted`,
  `cmpParameters`.`createdAt` AS `cmpParameters.createdAt`,
  `cmpParameters`.`updatedAt` AS `cmpParameters.updatedAt`
FROM
  (
    SELECT
      `CmpRecord`.`id`,
      `CmpRecord`.`recipient`,
      `CmpRecord`.`cmpCampaignId`,
      `CmpRecord`.`cmpTemplateId`,
      `CmpRecord`.`cmpMediaId`,
      `CmpRecord`.`activeStart`,
      `CmpRecord`.`activeStartHour`,
      `CmpRecord`.`activeStartMinute`,
      `CmpRecord`.`activeEnd`,
      `CmpRecord`.`activeEndHour`,
      `CmpRecord`.`activeEndMinute`,
      `CmpRecord`.`activeOnWeekends`,
      `CmpRecord`.`timezone`,
      `CmpRecord`.`sendTime`,
      `CmpRecord`.`status`,
      `CmpRecord`.`statusTime`,
      `CmpRecord`.`deleted`,
      `CmpRecord`.`createdAt`,
      `CmpRecord`.`updatedAt`,
      `cmpCampaign`.`id` AS `cmpCampaign.id`,
      `cmpCampaign`.`name` AS `cmpCampaign.name`,
      `cmpCampaign`.`campaignStartDate` AS `cmpCampaign.campaignStartDate`,
      `cmpCampaign`.`campaignEndDate` AS `cmpCampaign.campaignEndDate`,
      `cmpCampaign`.`activeStartHour` AS `cmpCampaign.activeStartHour`,
      `cmpCampaign`.`activeStartMinute` AS `cmpCampaign.activeStartMinute`,
      `cmpCampaign`.`activeEndHour` AS `cmpCampaign.activeEndHour`,
      `cmpCampaign`.`activeEndMinute` AS `cmpCampaign.activeEndMinute`,
      `cmpCampaign`.`activeOnWeekends` AS `cmpCampaign.activeOnWeekends`,
      `cmpCampaign`.`timezone` AS `cmpCampaign.timezone`,
      `cmpCampaign`.`actualStartDate` AS `cmpCampaign.actualStartDate`,
      `cmpCampaign`.`actualEndDate` AS `cmpCampaign.actualEndDate`,
      `cmpCampaign`.`actualDuration` AS `cmpCampaign.actualDuration`,
      `cmpCampaign`.`status` AS `cmpCampaign.status`,
      `cmpCampaign`.`statusTime` AS `cmpCampaign.statusTime`,
      `cmpCampaign`.`deleted` AS `cmpCampaign.deleted`,
      `cmpCampaign`.`createdAt` AS `cmpCampaign.createdAt`,
      `cmpCampaign`.`updatedAt` AS `cmpCampaign.updatedAt`
    FROM
      `CmpRecords` AS `CmpRecord`
      INNER JOIN `CmpCampaigns` AS `cmpCampaign` ON `CmpRecord`.`cmpCampaignId` = `cmpCampaign`.`id`
      AND (
        `cmpCampaign`.`status` = 'pending'
        OR `cmpCampaign`.`status` = 'started'
      )
      AND `cmpCampaign`.`campaignStartDate` <= '2020-04-03 03:49:44'
      AND `cmpCampaign`.`campaignEndDate` > '2020-04-03 03:49:44'
      AND `cmpCampaign`.`deleted` = false
    WHERE
      (
        (
          (
            `CmpRecord`.`activeStart` < `activeEnd`
            AND `CmpRecord`.`activeStart` <= 229
          )
          AND `CmpRecord`.`activeEnd` > 229
        )
        OR (
          `CmpRecord`.`activeStart` > `activeEnd`
          AND `CmpRecord`.`activeStart` <= 229
        )
        OR (
          `CmpRecord`.`activeStart` > `activeEnd`
          AND `CmpRecord`.`activeEnd` > 229
        )
      )
      AND `CmpRecord`.`status` = 'pending'
      AND `CmpRecord`.`deleted` = false
    LIMIT
      400
  ) AS `CmpRecord`
  LEFT OUTER JOIN `CmpTemplates` AS `cmpTemplate` ON `CmpRecord`.`cmpTemplateId` = `cmpTemplate`.`id`
  AND `cmpTemplate`.`deleted` = false
  LEFT OUTER JOIN `CmpChannels` AS `cmpTemplate->cmpChannel` ON `cmpTemplate`.`cmpChannelId` = `cmpTemplate->cmpChannel`.`id`
  AND `cmpTemplate->cmpChannel`.`deleted` = false
  LEFT OUTER JOIN `CmpApplications` AS `cmpTemplate->cmpChannel->cmpApplication` ON `cmpTemplate->cmpChannel`.`cmpApplicationId` = `cmpTemplate->cmpChannel->cmpApplication`.`id`
  AND `cmpTemplate->cmpChannel->cmpApplication`.`deleted` = false
  LEFT OUTER JOIN `CmpApiKeys` AS `cmpTemplate->cmpChannel->cmpApiKey` ON `cmpTemplate->cmpChannel`.`cmpApiKeyId` = `cmpTemplate->cmpChannel->cmpApiKey`.`id`
  AND `cmpTemplate->cmpChannel->cmpApiKey`.`deleted` = false
  LEFT OUTER JOIN `CmpMedia` AS `cmpMedia` ON `CmpRecord`.`cmpMediaId` = `cmpMedia`.`id`
  AND `cmpMedia`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaTexts` AS `cmpMedia->cmpMediaText` ON `cmpMedia`.`cmpMediaTextId` = `cmpMedia->cmpMediaText`.`id`
  AND `cmpMedia->cmpMediaText`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaImages` AS `cmpMedia->cmpMediaImage` ON `cmpMedia`.`cmpMediaImageId` = `cmpMedia->cmpMediaImage`.`id`
  AND `cmpMedia->cmpMediaImage`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaAudios` AS `cmpMedia->cmpMediaAudio` ON `cmpMedia`.`cmpMediaAudioId` = `cmpMedia->cmpMediaAudio`.`id`
  AND `cmpMedia->cmpMediaAudio`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaVideos` AS `cmpMedia->cmpMediaVideo` ON `cmpMedia`.`cmpMediaVideoId` = `cmpMedia->cmpMediaVideo`.`id`
  AND `cmpMedia->cmpMediaVideo`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaFiles` AS `cmpMedia->cmpMediaFile` ON `cmpMedia`.`cmpMediaFileId` = `cmpMedia->cmpMediaFile`.`id`
  AND `cmpMedia->cmpMediaFile`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaLocations` AS `cmpMedia->cmpMediaLocation` ON `cmpMedia`.`cmpMediaLocationId` = `cmpMedia->cmpMediaLocation`.`id`
  AND `cmpMedia->cmpMediaLocation`.`deleted` = false
  LEFT OUTER JOIN `CmpMediaViberTemplates` AS `cmpMedia->cmpMediaViberTemplate` ON `cmpMedia`.`cmpMediaViberTemplateId` = `cmpMedia->cmpMediaViberTemplate`.`id`
  AND `cmpMedia->cmpMediaViberTemplate`.`deleted` = false
  LEFT OUTER JOIN `CmpParameters` AS `cmpParameters` ON `CmpRecord`.`id` = `cmpParameters`.`cmpRecordId`
  AND `cmpParameters`.`deleted` = false;