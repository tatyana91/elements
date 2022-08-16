<template>
  <div id="elementShow" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Show element "{{ element.stock_title }}"</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-2">
            <div class="col-md-3">Component</div>
            <div class="col-md-9">{{ element.component_title }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Group</div>
            <div class="col-md-9">{{ element.group_title ? element.group_title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Category</div>
            <div class="col-md-9">{{ element.category_title ? element.category_title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Stock title</div>
            <div class="col-md-9">
              {{ element.stock_title }}
              <br>
              <a v-show=element.stock_link :href="element.stock_link"
                 target="_blank" title="Open in new tab">{{ element.stock_barcode }}</a>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Part number</div>
            <div class="col-md-9">{{ element.part_number }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Comment</div>
            <div class="col-md-9">{{ element.comment }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Description</div>
            <div class="col-md-9">{{ element.description }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Part status</div>
            <div class="col-md-9">{{ element.part_status ? element.part_status.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Part count</div>
            <div class="col-md-9">{{ element.part_count }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Count</div>
            <div class="col-md-9">{{ element.count }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Stock id</div>
            <div class="col-md-9">{{ element.stock_id }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Stock barcode</div>
            <div class="col-md-9">{{ element.stock_barcode }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Stock count</div>
            <div class="col-md-9">{{ element.stock_count }} {{ element.stock_count_type }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Stock part count</div>
            <div class="col-md-9">{{ element.stock_part_count }} {{ element.stock_part_count_type }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Help url</div>
            <div class="col-md-9">
              <a class="text-break" v-show=element.help_url :href="element.help_url"
                 target="_blank"
                 title="Open in new tab">{{ element.help_url }}</a>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Library ref</div>
            <div class="col-md-9">{{ element.library_ref ? element.library_ref.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Footprint ref2</div>
            <div class="col-md-9">{{ element.footprint_ref2 ? element.footprint_ref2.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Footprint ref1</div>
            <div class="col-md-9">{{ element.footprint_ref1 ? element.footprint_ref1.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Footprint ref3</div>
            <div class="col-md-9">{{ element.footprint_ref3 ? element.footprint_ref3.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Manufacturer</div>
            <div class="col-md-9">{{ element.manufacturer ? element.manufacturer.title : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Temp range</div>
            <div class="col-md-9">{{ element.temp_range ? element.temp_range.description : '-' }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Created at</div>
            <div class="col-md-9">{{ element.created_at }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-md-3">Updated at</div>
            <div class="col-md-9">{{ element.updated_at }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      element: { type: Object, required: true }
    }
}
</script>
